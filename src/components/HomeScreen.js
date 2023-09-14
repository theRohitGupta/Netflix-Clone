import React from 'react'
import Nav from './Nav'
import Banner from './Banner'
import Row from './Row'
import requests from '../Request'
import HomepageIcon from './HomepageIcon'

function HomeScreen() {
  return (
    <div>
        <Nav/>
        <Banner/>
        <br/>
        <Row title="NETFLIX ORIGINALS" fetchUrl = {requests.fetchNetflixOriginals} isLargeRow />        
        <Row title="Trending Now" fetchUrl = {requests.fetchTrending} />        
        <Row title="Top Rated" fetchUrl = {requests.fetchTopRated} />
        <Row title="Action Movies" fetchUrl = {requests.fetchActionMovies} />
        <Row title="Comedy Movies" fetchUrl = {requests.fetchComedyMovies} />
        <Row title="Horror Movies" fetchUrl = {requests.fetchHorrorMovies} />
        <Row title="Romance Movies" fetchUrl = {requests.fetchRomanceMovies} />
        <Row title="Documentaries" fetchUrl = {requests.fetchDocumentaries} />      
        <HomepageIcon/>
    </div>
  )
}

export default HomeScreen