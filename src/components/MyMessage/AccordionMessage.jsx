import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControlLabel, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { MdDoneAll, MdOutlineDone } from 'react-icons/md';
import { mainDomain } from '../../utils/mainDomain';

export default function AccordionMessage({ message}) {
  const [expanded, setExpanded] = useState(false);
  const[chang , setChang] = useState(false)

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
        // setFlag((e)=>!e)
        message.seenDateTime= new Date().toLocaleDateString('fa-IR')
        setChang((e)=>!e)
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
          <div className='flex flex-col'>
          <Typography sx={{ flexShrink: 0, fontWeight: '700' , px:1}}>{message.subject}</Typography>
          <Typography sx={{ color: 'text.secondary',fontSize:12 , mt:1 }}>{message.createdDateTimeFa.slice(0, 10)}</Typography>
          </div>

          <Typography className="absolute left-10 top-1/2 -translate-y-1/2">
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
