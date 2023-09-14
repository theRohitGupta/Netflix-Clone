import React from 'react'
import homeImg from './hacker.png'

function HomepageIcon() {
  return (
    <div className="fixed bottom-2 right-2 z-[9999] transition-all duration-300 ease-in-out hover:scale-110">
    <button className="redirect relative transition-all duration-300 ease-in-out">
      <p className="bg-yellow-500 p-2 tooltip -top-28 hidden right-1 absolute text-xs">Click On Me I'll Redirect You to Homepage</p>
      <a href="https://therohitgupta.github.io/Rohit-Gupta/" target="_blank"><img src={homeImg} alt="" className="h-12 w-12"/></a>
    </button>
  </div> 
  )
}

export default HomepageIcon