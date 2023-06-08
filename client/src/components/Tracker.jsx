import React, { useState, useEffect } from 'react';
import AddModal from './AddModal';
import Lists from './Lists';
import axios from 'axios';

const Tracker = ({ user, handleSignOut }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [problemsOptions, setProblemsOptions] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios.get(`/api/users/${user.id}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch(err => console.log('Err in get user data: ', err));
  }, [showAddModal]);

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
        <h1>LeetCode Tracker</h1>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
      <div className='tracker-button-container'>
        <button onClick={() => setShowAddModal(true)}>Add</button>
        <button>filter</button>
      </div>
      {showAddModal && problemsOptions && <AddModal setShow={setShowAddModal} datas={problemsOptions} userId={user.id} />}
      <div>
        {userData && <Lists userData={userData} />}
      </div>
    </div>
  )
}

export default Tracker;