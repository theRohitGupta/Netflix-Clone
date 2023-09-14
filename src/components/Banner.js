import React, { useEffect, useState } from 'react'
import axios from "../axios"
import requests from '../Request';

function Banner() {

    const [movie , setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            // console.log(request);
            setMovie(
                request.data.results[Math.floor(Math.random() * (request.data.results.length - 1))]   
            )
            // console.log(movie);
            // console.log(movie?.backdrop_path);
            return request;
        }
        fetchData();
    }, [])

    // console.log(movie);

    function truncate(string, n){
        return string?.length > n ? string.substring(0, n-1) + '...' : string
    }
  return (
    <div 
    className='h-[448px] relative text-white object-contain'
    style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
    }}>

    <div className='ml-[10px] sm:ml-[30px] pt-[160px] sm:pt-[140px] h-[330px]'>
        <h1 className='text-[2.3rem] sm:text-[3rem] font-bold pb-[0.3rem]'>{movie?.name || movie?.title || movie?.original_name}</h1>
        <div className=''>
            <button className='cursor-pointer font-semibold text-Black outline-none border-none rounded-[0.2vw] px-[2rem] mr-4 py-2 bg-[rgba(51,51,51,0.5)] hover:text-black hover:bg-[#e6e6e6] transition-all duration-200'>Play</button>
            <button className='cursor-pointer font-semibold text-white outline-none border-none rounded-[0.2vw] px-[2rem] mr-4 py-2 bg-[rgba(51,51,51,0.5)]  hover:text-black hover:bg-[#e6e6e6] transition-all duration-200'>My List</button>
        </div>
        <h1 className='w-full sm:w-[45rem] leading-[1.3] pt-4 text-[0.8rem] font-medium max-w-[360px] h-[80px]'>
        {
            truncate(`${movie?.overview}`, 200)
        }
        </h1>
    </div>

    <div className='h-[7.4rem] banner-fdbtm'></div>
    </div>
  )
}

export default Banner