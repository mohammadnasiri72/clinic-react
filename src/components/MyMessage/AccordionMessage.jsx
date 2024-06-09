import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControlLabel, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { MdDoneAll, MdOutlineDone } from 'react-icons/md';
import { mainDomain } from '../../utils/mainDomain';

export default function AccordionMessage({ message , setFlag}) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    if (!message.seenDateTime) {
        axios
      .get(`${mainDomain}/api/Message/Get/${message.messageId}` , {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res)=>{
        setFlag((e)=>!e)
      })
      .catch((err)=>{
        
      })
    }
  };

  return (
    <>
      <Accordion
        sx={{ backgroundColor: '#edeff2', my: 1 }}
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
         
          <Typography>
            {message.seenDateTime ? (
              <MdDoneAll className="text-green-500 text-xl " />
            ) : (
              <MdOutlineDone className="text-xl" />
            )}
          </Typography>
          <Typography sx={{ width: '33%', flexShrink: 0, fontWeight: '700' }}>{message.subject}</Typography>
          <Typography sx={{ color: 'text.secondary' }}>{message.createdDateTimeFa.slice(0, 10)}</Typography>

          <Typography className="absolute left-10">
            <span className="text-xs">جزئیات</span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{message.body}</Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
