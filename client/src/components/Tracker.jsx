import React, { useState, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUserData } from '../features/userDataSlice';
import AddModal from './AddModal';
const Lists = lazy(() => import('./Lists'));

function Tracker({ handleSignOut }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);

  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (search !== '') {
      axios.get(`/api/users/${userData.userId}`, { params: { searchQuery: search } })
        .then((response) => {
          const updatedUserData = { ...userData, lists: response.data };
          dispatch(setUserData(updatedUserData));
          setSearch('');
        })
        .catch((err) => console.log('Err in get search data: ', err));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const handleShowAll = (e) => {
    e.preventDefault();
    axios.get(`/api/users/${userData.userId}`)
      .then((response) => {
        dispatch(setUserData(response.data));
      })
      .catch((err) => console.log('Err in get data: ', err));
  };

  return (
    <div className="tracker-container">
      <div className="tracker-header">
        <h1>🏝️ Track Your LeetCode</h1>
        <button className="shared-btn2" type="button" onClick={handleSignOut}>
          <div className="shared-icon2"><svg viewBox="0 0 512 512"><path fill="white" d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" /></svg></div>
          <div className="shared-text2">Logout</div>
        </button>
      </div>
      {userData && (
        <small>
          Welcome back,
          {userData.username}
        </small>
      )}
      <div className="tracker-button-container">
        <div className="search-button-container">
          <input
            placeholder="Type to search..."
            required
            className="search-input"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            onKeyDown={handleKeyDown}
          />
          <div className="search-icon" onClick={handleSearch}>
            <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <title>Search</title>
              <path strokeWidth="45" strokeMiterlimit="10" stroke="currentColor" fill="none" d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" />
              <path d="M338.29 338.29L448 448" strokeWidth="45" strokeMiterlimit="10" strokeLinecap="round" stroke="currentColor" fill="none" />
            </svg>
          </div>
        </div>
        <button className="shared-btn2" id="show-all-btn" type="button" onClick={handleShowAll}>
          <div className="shared-icon2">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" />
              <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6" />
            </svg>
          </div>
          <div className="shared-text2">Show All</div>
        </button>
        <button className="shared-btn2" id="add-problem-btn" type="button" onClick={() => setShowAddModal(true)}>
          <div className="shared-icon2">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
          <div className="shared-text2">New Problem</div>
        </button>
      </div>
      {showAddModal && userData
        && <AddModal setShow={setShowAddModal} userId={userData.userId} />}
      <Suspense fallback={<div>Loading...</div>}>
        <Lists showAddModal={showAddModal} />
      </Suspense>
    </div>
  );
}

export default Tracker;
