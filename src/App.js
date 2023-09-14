import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './components/HomeScreen';
import { Route, Routes } from "react-router-dom";
import Login from './components/Login';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import Profile from './components/Profile';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if(userAuth){
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
        }))
      }else{
        dispatch(logout());
      }
    })

    return unsubscribe;
  }, [dispatch])

  return (
    <div className='bg-black'>
          { !user ? (
                <Login />          
            ) : (
              <Routes>
                <Route path='/profile' element={<Profile/>} />
                <Route path='/' element={<HomeScreen />}/>
              </Routes>
            )
          }
    </div>
  );
}

export default App;
