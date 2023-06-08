import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const List = ({ list, index, updateChecked, updateNote, deleteProblem }) => {
  const [expanded, setExpanded] = useState(false);
  const [checked, setChecked] = useState(list.checkmark);
  const [note, setNote] = useState(list.note);

  const handleCheckClick = async (e) => {
    e.stopPropagation();
    const newChecked = !checked;
    setChecked(newChecked);
    updateChecked({ index: index, checkmark: newChecked });
  };

  const handleChange = (panel) => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${index + 1}bh-content`}
        id={`panel${index}bh-header`}
      >
        <div onClick={handleCheckClick}>
          <Checkbox checked={checked} inputProps={{ 'aria-label': 'controlled' }} />
        </div>
        <Typography sx={{ width: '50%', display: 'flex', alignItems: 'center' }}>
          {list.title}
        </Typography>
        <Typography sx={{ width: '10%', display: 'flex', alignItems: 'center' }}>
          {list.difficulty}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          {list && list.tag.map((item) => (<Chip key={item} color="info" label={item} />))}
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Container sx={{ minHeight: '30px' , position: 'relative'}}>
          {list && <>
            <ReactQuill value={note} onChange={(value) => setNote(value)} />
            <button onClick={() => { updateNote({ index: index, note: note }) }}>Save Note</button>
          </>}
          <div className='delete-icon' onClick={() => deleteProblem({ index: index })} >
            <FontAwesomeIcon icon={faTrashCan} size="xl" style={{ color: "#ff6666" }} />
          </div>
        </Container>
      </AccordionDetails>
    </Accordion>
  );
}

export default List;
