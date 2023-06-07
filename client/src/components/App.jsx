import React, { useEffect, useState } from 'react';
import Tracker from './Tracker';
import Auth from './Auth';

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);

  const handleSignOut = () => {
    setUser(null);
    setIsLogin(false);
  };

  return (
    <div className='app-container'>
      {!isLogin && <Auth setIsLogin={setIsLogin} setUser={setUser} />}
      {isLogin && user && <Tracker user={user} handleSignOut={handleSignOut} />}
    </div>
  )
}

export default App