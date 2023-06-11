import React, { useEffect } from 'react'
import List from './List';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../features/userDataSlice';

const Lists = ({ user, showAddModal }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  if (!userData) {
    dispatch(setUserData(user));
  }
  useEffect(() => {
    if (userData) {
      axios.get(`/api/users/${userData.userId}`)
        .then((response) => {
          dispatch(setUserData(response.data));
        })
        .catch(err => console.log('Err in get user data: ', err));
    }
  }, [dispatch, showAddModal]);

  return (
    <div className='lists-container'>
      {userData && userData.lists.map((item, index) => (
        <List key={item.questionid} listId={userData._id} index={index} list={item} />
      ))}
    </div>
  )
}

export default Lists;
