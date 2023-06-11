import React, { useState } from 'react';
import Tracker from './Tracker';
import Auth from './Auth';
import { Provider } from 'react-redux';
import store from '../store/store';

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);

  const handleSignOut = () => {
    setUser(null);
    setIsLogin(false);
    // Clear the localStorage token after sign out
    localStorage.removeItem('userToken');
  };

  return (
    <Provider store={store}>
      <div className='app-container'>
        {!isLogin && <Auth setIsLogin={setIsLogin} setUser={setUser} isLogin={isLogin} />}
        {isLogin && user && <Tracker user={user} handleSignOut={handleSignOut} />}
      </div>
    </Provider>
  )
}

export default App