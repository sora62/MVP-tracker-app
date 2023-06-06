import React, { useState } from 'react'
import AddModal from './AddModal';

const Tracker = ({ setIsLogin }) => {
  const [showAddModal, setShowAddModal] = useState(false);
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
      {showAddModal && <AddModal setShow={setShowAddModal}/>}
    </div>
  )
}

export default Tracker