import React, { useState, useEffect } from 'react';
import AddModal from './AddModal';
import Lists from './Lists';
import axios from 'axios';

const Tracker = ({ user, handleSignOut }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [problemsOptions, setProblemsOptions] = useState(null);

  useEffect(() => {
    axios.get('/api/problems/titles')
      .then((response) => {
        const problemsOptions = response.data.map((item) => { return { value: item._id, label: item.title } });
        setProblemsOptions(problemsOptions);
      })
      .catch(err => console.log('Err in get problems options: ', err));
  }, []);

  return (
    <div className='tracker-container'>
      <div className='tracker-header'>
        <h1>🏝️ Track Your LeetCode</h1>
        <button className="shared-btn2" onClick={handleSignOut}>
          <div className="shared-icon2"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
          <div className="shared-text2">Logout</div>
        </button>
      </div>
      <small>Welcome back, {user.username}</small>
      <div className='tracker-button-container'>
        <button className="shared-btn2" id="add-problem-btn" onClick={() => setShowAddModal(true)}>
          <div className="shared-icon2"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></div>
          <div className="shared-text2">New Problem</div>
        </button>
      </div>
      {showAddModal && problemsOptions && <AddModal setShow={setShowAddModal} datas={problemsOptions} userId={user.userId} />}
      {user && <Lists user={user} showAddModal={showAddModal} />}
    </div>
  )
}

export default Tracker;