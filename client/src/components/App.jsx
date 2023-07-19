import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserData } from '../features/userDataSlice';
import { setProblemsOptions } from '../features/problemsSlice';
import Tracker from './Tracker';
import Auth from './Auth';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('/api/problems/titles')
      .then((response) => {
        const res = response.data.map((item) => ({ value: item._id, label: item.title }));
        dispatch(setProblemsOptions(res));
      })
      .catch((err) => console.log('Err in get problems options: ', err));
  }, []);

  const handleSignOut = () => {
    dispatch(setUserData(null));
    setIsLogin(false);
    // Clear the localStorage token after sign out
    localStorage.removeItem('userToken');
  };

  return (
    <div className="app-container">
      <img src={require('../../dist/LeetNote_logo.png')} alt="logo" className="logo" />
      {!isLogin && <Auth setIsLogin={setIsLogin} isLogin={isLogin} />}
      {isLogin && <Tracker handleSignOut={handleSignOut} />}
    </div>
  );
}

export default App;
