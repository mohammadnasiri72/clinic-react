import axios from 'axios';
import React, { useState } from 'react'
import { mainDomain } from '../../utils/mainDomain';

export default function InputDelete() {
    const[nationalId , setDel] = useState('')
    const delId = {
        nationalId
        
    }
    const url = `/api/Patient/Delete2?nationalId=${delId.nationalId}`
    const delHandler = ()=>{
        axios
        .post(mainDomain+ url)
        .then((response) => {
          console.log("ok");
        })
        .catch((error) => {
         console.log(error);
        });
    }
  return (
    <>
        <input onChange={(e)=> setDel(e.target.value)} type="text" className='border'/>
        <button onClick={delHandler}>del</button>
    </>
  )
}
