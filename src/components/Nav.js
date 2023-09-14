import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NetflixImage from "./netflix.png";

function Nav() {
    const [show, handleShow] = useState(false);
    const navigate = useNavigate();

    const transitionNavBar = () => {
        if(window.scrollY > 100) {
            handleShow(true);
        }else{
            handleShow(false);
        }
    }

    useEffect( () => {
        window.addEventListener("scroll", transitionNavBar);
        return () => window.removeEventListener('scroll', transitionNavBar);
    }, [])

    const currentUrl = window.location.href;
    // console.log(currentUrl.split('/')[3]);

  return (
    <div>
        <div className={`${show && 'bg-[#111]'} flex justify-between items-center fixed top-0 p-5 w-full h-[60px] z-10 ease-in transition-all duration-500`}>
            <img src={NetflixImage} className='fixed left-5 w-[80px] cursor-pointer object-contain' onClick={() => navigate("/")} alt="Netflix"/>
            {
                currentUrl.split('/')[3] !== 'profile' && <img src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117' className='fixed right-5 w-[30px] h-[30px] cursor-pointer'onClick={() => navigate("profile")} alt='Avatar'/>
            }
        </div>
    </div>
  )
}

export default Nav