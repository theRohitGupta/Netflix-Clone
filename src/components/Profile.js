import React from 'react'
import Nav from './Nav'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice';
import { auth } from '../firebase';
import Plans from './Plans';
import HomepageIcon from './HomepageIcon';

function Profile() {
    const user = useSelector(selectUser);

  return (
    <div className='h-screen text-white '>
        <Nav/>
        <div className='flex flex-col w-[90%] sm:w-[50%] mx-auto max-w-[800px] pt-[30%] sm:pt-[8%]'>
            <h1 className='text-[30px] sm:text-[60px] font-normal border-b-[1px] border-solid border-[#282c2d] mb-[20px]'>Edit Profile</h1>
            <div className='flex justify-around'>
                <img className='h-[80px] sm:h-[100px]' src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117' alt='Avatar'/>
                <div className='text-white ml-[15px] sm:ml-[25px] sm:flex-1'>
                    <h2 className='bg-gray-500 p-[10px] sm:p-[15px] text-[15px] sm:pl-[20px] mr-[10px] sm:mr-0'>{user.email}</h2>
                    <div className='w-full'>
                        <h3 className='border-b-[1px] border-solid border-[#282c2d] pb-[10px] mt-5 font-semibold'>Plans</h3>
                        <Plans/>
                        <button onClick={() => auth.signOut()} className='p-[10px] text-[1rem] mt-[5%] w-full text-white bg-[#e50914] cursor-pointer font-semibold border-none hover:scale-[1.01] transition-all duration-200'>Sign Out</button>
                    </div>
                </div>
            </div>
        </div>
        <HomepageIcon/>
    </div>
  )
}

export default Profile