import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import axios from 'axios';

const tagsOptions = [
  { value: 'Array', label: 'Array' },
  { value: 'Backtracking', label: 'Backtracking' },
  { value: 'BFS', label: 'BFS' },
  { value: 'Binary Search', label: 'Binary Search' },
  { value: 'Binary Search Tree', label: 'Binary Search Tree' },
  { value: 'Binary Tree', label: 'Binary Tree' },
  { value: 'Bit Manipulation', label: 'Bit Manipulation' },
  { value: 'Counting', label: 'Counting' },
  { value: 'DFS', label: 'DFS' },
  { value: 'Divide and Conquer', label: 'Divide and Conquer' },
  { value: 'DP', label: 'DP' },
  { value: 'Graph', label: 'Graph' },
  { value: 'Greedy', label: 'Greedy' },
  { value: 'Hash Table', label: 'Hash Table' },
  { value: 'Heap', label: 'Heap' },
  { value: 'Linked List', label: 'Linked List' },
  { value: 'Math', label: 'Math' },
  { value: 'Matrix', label: 'Matrix' },
  { value: 'Ordered Set', label: 'Ordered Set' },
  { value: 'Prefix Tree', label: 'Prefix Tree' },
  { value: 'Queue', label: 'Queue' },
  { value: 'Recursion', label: 'Recursion' },
  { value: 'Simulation', label: 'Simulation' },
  { value: 'Sorting', label: 'Sorting' },
  { value: 'Stack', label: 'Stack' },
  { value: 'String', label: 'String' },
  { value: 'Tree', label: 'Tree' },
  { value: 'Two Pointers', label: 'Two Pointers' },
];

const AddModal = ({ setShow, datas, userId }) => {
  const [problem, setProblem] = useState(null);
  const [tags, setTags] = useState([tagsOptions[0], tagsOptions[13]]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedTags = tags.map((item) => item.value);
    try {
      const response = await axios.get(`api/problems/${problem.value}`); // problem.value is _id in ProblemsModel
      const data = response.data; // problem data
      data['tag'] = selectedTags;
      axios.post(`/api/users/${userId}/lists`, data)
        .then(() => {
          setShow(false);
        })
        .catch((err) => {
          alert(err.response.data);
        });
    } catch (error) {
      console.log('Err in get problem data: ', error)
    }
  };

  return (
    <div className='overlay'>
      <div className='add-modal-container'>
        <div className='close-button' onClick={() => setShow(false)}>
          <FontAwesomeIcon icon={faCircleXmark} size="xl" style={{ color: "#ff7a8e" }} />
        </div>
        <form className='add-form' onSubmit={handleSubmit}>
          <label>Search LeetCode Problem By Title:
            <Select
              defaultValue={problem}
              isSearchable={true}
              onChange={setProblem}
              options={datas}
              required={true}
              className='problem-select'
            />
          </label>
          <label>Tags:
            <Select
              defaultValue={[tagsOptions[0], tagsOptions[13]]}
              isMulti
              name="tags"
              onChange={setTags}
              options={tagsOptions}
              required={true}
              className="tags-select"
            />
          </label>
          <button type="submit" className='create-button'>Create</button>
        </form>
      </div>
    </div>
  )
}

export default AddModal;