import React, { useEffect, useState } from 'react';
import axios from '../axios';
import YouTube from "react-youtube";
import movieTrailer from 'movie-trailer';

function Row({title, fetchUrl, isLargeRow = false}) {

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl])

    console.log(movies);
    console.log(trailerUrl);

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          autoplay: 1,
        },
    }

    const handleClick = (movie) => {
        console.log(movie);
        if(trailerUrl){
            setTrailerUrl("");
        }else{
            movieTrailer(movie?.title || movie?.original_title || movie?.name || movie?.original_name || "")
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                console.log(urlParams);
                setTrailerUrl(urlParams.get('v'));
            }).catch(err => console.log(err));
        }
    }

    // console.log(movies);

  return (
    <div className='text-white ml-5'>
        <h2 className='font-bold'>{title}</h2>

        <div className='flex overflow-y-hidden overflow-x-scroll p-5 row-poster relative'>
            {
                movies.map((movie) => (
                    ((isLargeRow && movie.poster_path) 
                    || (!isLargeRow && movie.backdrop_path)) && 
                    (
                            <img 
                            src={`https://image.tmdb.org/t/p/original/${
                                isLargeRow ? movie.poster_path : movie.backdrop_path
                            }`} 
                            key={movie.id}
                            onClick={() => handleClick(movie)}
                            alt={movie.name}
                            className={`${isLargeRow && "max-h-[250px]"} max-h-[120px] object-contain mr-3 w-full transition-all duration-500 hover:scale-[1.09] hover:opacity-[1]`}
                            title={movie?.name || movie?.original_title || ""}
                            />                 
                    )))
            }
        </div>
        
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}

    </div>
  )
}

export default Row