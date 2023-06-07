import React, { useState, useEffect } from 'react';
import AddModal from './AddModal';
import axios from 'axios';

const Tracker = ({ user, handleSignOut }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log('User in Tracker: ', user);
    axios.get(`api/users/${user.id}`)
      .then((response) => {
        console.log('user data: ', response.data);
      })
      .catch(err => console.log('Err in get user data: ', err));

    axios.get('api/problems/titles')
      .then((response) => {
        const problemsOptions = response.data.map((item) => { return { value: item._id, label: item.title } });
        setData(problemsOptions);
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
      {showAddModal && data && <AddModal setShow={setShowAddModal} datas={data} />}
    </div>
  )
}

export default Tracker