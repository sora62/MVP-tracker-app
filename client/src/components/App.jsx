import React, { useState } from 'react';
import Tracker from './Tracker';
import Auth from './Auth';

const App = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className='app-container'>
      {!isLogin && <Auth />}
      {isLogin && <Tracker setIsLogin={setIsLogin} />}
    </div>
  )
}

export default App