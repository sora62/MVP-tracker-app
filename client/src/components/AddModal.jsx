import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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

function AddModal({ setShow, userId }) {
  const problemsOptions = useSelector((state) => state.problems);
  const [problem, setProblem] = useState(null);
  const [tags, setTags] = useState([tagsOptions[0], tagsOptions[13]]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedTags = tags.map((item) => item.value);
    try {
      const response = await axios.get(`api/problems/${problem.value}`); // problem.value is _id in ProblemsModel
      const { data } = response; // problem data
      data.tag = selectedTags;
      await axios.post(`/api/users/${userId}/lists`, data);
      setShow(false);
    } catch (error) {
      alert('The problem already exists.');
      console.log('Err in get problem data: ', error);
    }
  };

  return (
    <div className="overlay">
      <div className="add-modal-container">
        <div className="close-button" onClick={() => setShow(false)}>
          <FontAwesomeIcon icon={faCircleXmark} size="xl" style={{ color: '#ff7a8e' }} />
        </div>
        <form className="add-form" onSubmit={handleSubmit}>
          <label>
            Search LeetCode Problem By Title:
            {problemsOptions && (
            <Select
              defaultValue={problem}
              isSearchable
              onChange={setProblem}
              options={problemsOptions}
              required
              className="problem-select"
            />
            )}
          </label>
          <label>
            Tags:
            <Select
              defaultValue={[tagsOptions[0], tagsOptions[13]]}
              isMulti
              name="tags"
              onChange={setTags}
              options={tagsOptions}
              required
              className="tags-select"
            />
          </label>
          <button className="shared-btn" type="submit">
            <p className="shared-text"> Create </p>
            <span className="shared-icon-box">
              <svg className="shared-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddModal;
