import { TextField } from '@mui/material';
import React from 'react';

export default function InputLastNameProfileUpdate({ setLastName, lastName }) {
  let color = ''
  if (lastName.length > 2) {
    color = 'success'
  }else if (lastName.length === 0) {
    color = 'primary'
  }else{
    color = 'error'
  }
  return (
    <>
      <div className="sm:w-1/2 w-full mx-auto mt-4 px-5">
        <TextField
          onChange={(e) => setLastName(e.target.value)}
          className="w-full"
          id="outlined-multiline-flexible"
          label="نام خانوادگی"
          multiline
          value={lastName}
          maxRows={4}
          color={color}
        />
      </div>
    </>
  );
}
