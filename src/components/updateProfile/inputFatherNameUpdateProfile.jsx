import { TextField } from '@mui/material';
import React from 'react';

export default function InputFatherNameUpdateProfile({ setFatherName, fatherName }) {
  let color = '';
  if (fatherName?.length > 2) {
    color = 'success';
  }else if (fatherName?.length === 0) {
    color = 'primary'
  }else {
    color = 'error'
  }
  return (
    <>
      <div className="sm:w-1/2 w-full mx-auto mt-6 px-5">
        <TextField
          onChange={(e) => setFatherName(e.target.value)}
          className="w-full"
          id="outlined-multiline-flexible"
          label="نام پدر"
          multiline
          value={fatherName}
          maxRows={4}
          // color={color}
        />
      </div>
    </>
  );
}
