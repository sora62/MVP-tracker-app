import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const AddModal = ({ setShow }) => {
  return (
    <div className='overlay'>
      <div className='add-modal-container'>
        <div className='close-button' onClick={() => setShow(false)}>
          <FontAwesomeIcon icon={faCircleXmark} size="lg" style={{ color: "#ff7a8e" }} />
        </div>
        <button>Create</button>
      </div>
    </div>
  )
}

export default AddModal