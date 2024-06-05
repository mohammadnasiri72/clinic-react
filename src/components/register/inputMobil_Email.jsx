import { TextField } from '@mui/material';
import { useEffect, useRef } from 'react';

export default function InputMobilEmail({ abroad, email, setEmail, mobile, setMobile, isfocusInpMobile}) {
  const paternMobile = /09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/;
  const paternEmail = /[a-zA-Z0-9.-]+@[a-z-]+\.[a-z]{2,3}/;
  const inputRef = useRef(null)
  useEffect(()=>{
    if (isfocusInpMobile) {
      inputRef.current.focus()
    }
  },[isfocusInpMobile])
  let colorEmailOrMobile = '';
  if (abroad) {
    if (email.match(paternEmail)) {
      colorEmailOrMobile = 'success';
    } else if (email.length === 0) {
      colorEmailOrMobile = 'primary';
    } else {
      colorEmailOrMobile = 'error';
    }
  } else if (mobile.match(paternMobile)) {
    colorEmailOrMobile = 'success';
  } else if (mobile.length === 0) {
    colorEmailOrMobile = 'primary';
  } else {
    colorEmailOrMobile = 'error';
  }
  
  return (
    <>
      <div className="px-5 lg:w-2/3 w-full mx-auto mt-4">
      
        <div className="mt-2">
          <TextField
          ref={inputRef}
          // focused={isfocusInpMobile}
          inputRef={input => isfocusInpMobile && input &&  input.focus()}
            onChange={(e) => (abroad === false ? `${setMobile(e.target.value)}` : `${setEmail(e.target.value)}`)}
            value={abroad ? email : mobile}
            className="w-full"
            // id="outlined-multiline-flexible"
            label={abroad ? 'ایمیل' : 'شماره موبایل'}
            color={colorEmailOrMobile}
            maxRows={4}
            // InputProps={{className:'textfield-style'}}
          />
        </div>
          
      </div>
    </>
  );
}
