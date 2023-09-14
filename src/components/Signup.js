import React, { useRef } from 'react'
import { auth } from '../firebase';

function Signup() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const register = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value,
        ).then((authUser) => {
            console.log(authUser);
        }).catch((error) => {
            alert(error.message);
        })
    }

    const signIn = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value,
        ).then((authUser) => {
            console.log(authUser);
        }).catch((error) => {
            alert(error.message);
        });
    }

  return (
    <div className='md:-mt-16 max-w-[380px] px-[30px] sm:px-[40px] md:px-[50px] py-[50px] mx-auto bg-[rgba(0,0,0,0.85)]'>
        <form className='grid flex-col w-full'>
            <h1 className='font-bold text-[2rem] mb-[20px] text-left'>Welcome!</h1>
            <input ref={emailRef} className='outline-0 h-[40px] mb-[14px] rounded-[5px] border-none px-[5px] py-[15px] text-black' placeholder='Enter Your Email' type='email'/>
            <input ref={passwordRef} className='outline-0 h-[40px] mb-[14px] rounded-[5px] border-none px-[5px] py-[15px] text-black' placeholder='Enter Your Password' type='password'/>
            <button onClick={signIn} className='px-[16px] py-[10px] text-[1rem] text-white rounded-[5px] bg-[#e50914] font-semibold cursor-pointer mt-[20px] border-none' type='submit'>Sign in</button>
            {/* <div className='text-center mt-[10px] text-gray-500'><span></span>OR<span></span></div> */}
            <div className='flex gap-1 items-center mt-[10px] font-semibold'> 
                <hr className='w-full' color='gray'/>OR <hr className='w-full'/>
            </div>
            {/* <h4 className='text-left mt-[10px]'><span className='text-gray-500'>New To Netflix? </span><span className='cursor-pointer hover:underline' onClick={register}>Sign Up Now.</span></h4> */}
            <button onClick={register} className='px-[16px] py-[10px] text-[1rem] text-white rounded-[5px] bg-[#e50914] font-semibold cursor-pointer mt-[10px] border-none' type='submit'>Create an Account</button>
        </form>
    </div>
  )
}

export default Signup