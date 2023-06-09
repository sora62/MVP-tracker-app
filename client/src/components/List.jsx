import React, { useState, useEffect } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography, Chip, Stack, Checkbox, Container } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CodeSnippetEditor from './CodeSnippetEditor';
import moment from 'moment';

const List = ({ list, index, updateChecked, updateNote, deleteProblem, updateCode }) => {
  const [expanded, setExpanded] = useState(false);
  const [checked, setChecked] = useState(list.checkmark);
  const [note, setNote] = useState(list.note);
  const [showCode, setShowCode] = useState(false);

  useEffect(() => {
    console.log('List: ', list);
  }, [showCode,]);

  const handleCheckClick = async (e) => {
    e.stopPropagation();
    const newChecked = !checked;
    setChecked(newChecked);
    updateChecked({ index: index, checkmark: newChecked });
  };

  const handleCodeClick = async (e) => {
    e.stopPropagation();
    setShowCode(!showCode);
  }

  const handleChange = (panel) => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${index + 1}bh-content`}
          id={`panel${index}bh-header`}
        >
          <div onClick={handleCheckClick}>
            <Checkbox checked={checked} inputProps={{ 'aria-label': 'controlled' }} />
          </div>
          <Typography sx={{ width: '40%', display: 'flex', alignItems: 'center' }}>
            {list.title}
          </Typography>
          <Typography sx={{ width: '10%', display: 'flex', alignItems: 'center' }}>
            {list.difficulty}
          </Typography>
          <Stack direction="row" alignItems="center" width='30%' spacing={1} sx={{ flexWrap: 'wrap', gap: '5px' }}>
            {list && list.tag.map((item) => (<Chip key={item} color="info" label={item} />))}
          </Stack>
          <Typography sx={{ display: 'flex', ml: 2, alignItems: 'center' }}>
            <button className="code-btn" onClick={handleCodeClick}>
              <span className="code-span">
                <svg className="code-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z"></path></svg>Code</span>
            </button>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Container sx={{ minHeight: '70px', position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <small className='create-date'>{list && moment(list.date).fromNow()}</small>
            {list && <>
              <ReactQuill value={note} onChange={(value) => setNote(value)} />
              <button className="save-btn" onClick={() => { updateNote({ index: index, note: note }) }}>
                <p className="save-text"> Save </p>
                <span className="save-icon-box">
                  <svg className="save-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                </span>
              </button>
            </>}
            <button className="delete-btn" onClick={() => deleteProblem({ index: index })}>
              <svg className="delete-svgIcon" viewBox="0 0 448 512">
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
              </svg>
            </button>
          </Container>
        </AccordionDetails>
      </Accordion>
      {showCode && list && <CodeSnippetEditor setShowCode={setShowCode} codeData={list.code} updateCode={updateCode} index={index} />}
    </>
  );
}

export default List;
