import React, { useState } from 'react';
import Tracker from './Tracker';
import Auth from './Auth';
import { useDispatch } from 'react-redux';
import { setUserData } from '../features/userDataSlice';

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  //const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(setUserData(null));
    setIsLogin(false);
    // Clear the localStorage token after sign out
    localStorage.removeItem('userToken');
  };

  return (
      <div className='app-container'>
        {!isLogin && <Auth setIsLogin={setIsLogin} isLogin={isLogin} />}
        {isLogin && <Tracker handleSignOut={handleSignOut} />}
      </div>
  )
}

export default App