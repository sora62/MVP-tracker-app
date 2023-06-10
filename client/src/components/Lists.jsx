import React, { useEffect, useState } from 'react'
import List from './List';
import axios from 'axios';

const Lists = ({ user, showAddModal }) => {
  const [userData, setUserData] = useState(user);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    axios.get(`/api/users/${userData.userId}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch(err => console.log('Err in get user data: ', err));
  }, [updated, showAddModal]);

  const updateCheckmark = (data) => {
    data['id'] = userData._id;
    axios.put(`/api/users/${userData.userId}/lists/checkmark`, data)
      .then(() => {
        alert('Successfully updated!');
        setUpdated(!updated);
      })
      .catch(err => console.log('Err in updateCheckmark: ', err));
  };

  const updateNote = (data) => {
    data['id'] = userData._id;
    axios.put(`/api/users/${userData.userId}/lists/note`, data)
      .then(() => {
        alert('Successfully updated!');
        setUpdated(!updated);
      })
      .catch(err => console.log('Err in updateNote: ', err));
  };

  const updateCode = (data) => {
    data['id'] = userData._id;
    axios.put(`/api/users/${userData.userId}/lists/code`, data)
      .then(() => {
        alert('Successfully updated!');
        setUpdated(!updated);
      })
      .catch(err => console.log('Err in updateCode: ', err));
  };

  const deleteProblem = (data) => {
    data['id'] = userData._id;
    axios.put(`/api/users/${userData.userId}/lists/delete`, data)
      .then(() => {
        setUpdated(!updated);
      })
      .catch(err => console.log('Err in get user data: ', err));
  };

  return (
    <div className='lists-container'>
      {userData.lists.map((item, index) =>
      (<List
        key={item.questionid}
        index={index}
        list={item}
        updateChecked={updateCheckmark}
        updateNote={updateNote}
        deleteProblem={deleteProblem}
        updateCode={updateCode} />))}
    </div>
  )
}

export default Lists;
