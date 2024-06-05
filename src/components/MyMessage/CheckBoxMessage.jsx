import { Checkbox, FormControlLabel } from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function CheckBoxMessage({ message, listMessageChecked, setListMessageChecked , listMessage}) {
  const [valCeckBox, setValCeckBox] = useState(false);

  useEffect(()=>{
    if (listMessageChecked.length === listMessage.length && listMessageChecked.length !==0) {
        setValCeckBox(true)
    }
    if (listMessageChecked.length ===0) {
        setValCeckBox(false)
    }
  },[listMessageChecked , message])
  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            onChange={() => {
              if (listMessageChecked.includes(message)) {
                setListMessageChecked(listMessageChecked.filter((ev) => ev.messageId !== message.messageId));
                setValCeckBox(false);
              } else {
                setListMessageChecked([...listMessageChecked, message]);
                setValCeckBox(true);
              }
            }}
            checked={valCeckBox}
          />
        }
      />
    </>
  );
}
