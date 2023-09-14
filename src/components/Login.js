import React, { useState } from 'react'
import Signup from './Signup';
import HomepageIcon from './HomepageIcon';
import NetflixImage from "./netflix.png";

function Login() {
    const [signIn, setSignIn] = useState(false);

  return (
    <div className=' relative h-full bg-[url("https://assets.nflxext.com/ffe/siteui/vlv3/757ab38f-5d08-40bc-b3eb-eaba63ed8203/93c34f94-56c8-40a7-8b2e-b4aac6427977/GB-en-20210125-popsignuptwoweeks-perspective_alpha_website_medium.jpg")] bg-center bg-no-repeat bg-cover'>
        <div>
            <img src={NetflixImage} alt='netflix' 
            className='fixed left-0 w-[150px]'/>
            <button onClick={() => setSignIn(true)} className='hidden fixed top-5 right-5 px-5 py-2 text-[1rem] text-white bg-[#e50914] font-semibold border-none cursor-pointer rounded-sm'>
                Sign in
            </button>
            <div className='w-full h-screen div-gradient'></div>

            <div className='z-10 text-white p-5 absolute top-[20%] md:top-[30%] mx-auto w-full text-center left-0 right-0'>
                {
                    signIn ? (
                        <Signup/>
                    ) : (
                        <div className='w-full'>
                            <h1 className='text-[2.3rem] md:text-[3.125rem] mb-5 font-semibold'>Unlimited Films, TV Programmes and More.</h1>
                            <h2 className=' text-[1.3rem] md:text-[2rem] font-normal mb-[30px]'>Watch Anywhere. Cancel at Anytime</h2>
                            <h3 className=' text-[1rem] md:text-[1.3rem] font-normal'>Ready To Watch? Just Click on <span className=' border-b-2 border-[#e50914]'>Get Started</span></h3>

                            {/* <div className='mt-5'>
                                <form>
                                    <input className=' px-[16px] py-[22px] outline-0 h-[30px] w-[30%] border-none max-w-[600px] text-black' type='email' placeholder="Email Address"/>
                                </form>
                            </div> */}
                            <button onClick={() => setSignIn(true)} className='mt-10 px-[25px] py-[10px] text-[1rem] text-white bg-[#e50914] font-semibold border-none cursor-pointer rounded-sm'>GET STARTED</button>
                        </div>
                    )
                }
            </div>
        </div>
        <HomepageIcon/>
    </div>
  )
}

export default Login