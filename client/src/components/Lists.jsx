import React, { useEffect, useState } from 'react'
import List from './List';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../features/userDataSlice';
import { Pagination, Stack } from '@mui/material';

const Lists = ({ showAddModal }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const [currentList, setCurrentList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0); // offset for pagination index
  const itemsPerPage = 10; // Number of items to display per page

  useEffect(() => {
    if (userData) {
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      setOffset(indexOfFirstItem);
      setCurrentList(userData.lists.slice(indexOfFirstItem, indexOfLastItem));
    }
  }, [dispatch, userData, currentPage]);

  useEffect(() => {
    if (userData) {
      axios.get(`/api/users/${userData.userId}`)
        .then((response) => {
          dispatch(setUserData(response.data));
        })
        .catch(err => console.log('Err in get user data: ', err));
    }
  }, [dispatch, showAddModal]);

  useEffect(() => {
    // Check if the last item on the current page is deleted
    if (userData && currentList.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1); // Switch to the previous page
    }
  }, [currentList, currentPage, userData]);

  const handlePageChange = (e, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='lists-container'>
      {userData && <small>Total: {userData.lists.length}</small>}
      {currentList && currentList.map((item, index) => (
        <List key={item.questionid} listId={userData._id} index={offset + index} list={item} />
      ))}
      <Stack spacing={2} mt={5}>
        {userData && (
          <Pagination
            count={Math.ceil(userData.lists.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
          />
        )}
      </Stack>
    </div>
  )
}

export default Lists;
