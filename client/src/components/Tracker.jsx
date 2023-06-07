import React, { useState, useEffect } from 'react'
import AddModal from './AddModal';
import axios from 'axios';

const Tracker = ({ setIsLogin }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
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
        <button onClick={() => setIsLogin(false)}>Sign Out</button>
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