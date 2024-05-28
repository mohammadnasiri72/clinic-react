import React, { useState } from 'react';
import NationalIdLogin from './nationalIdLogin';
import MobileLogin from './mobileLogin';
import SimpleBackdrop from '../backdrop';

export default function MainLoginPage() {
  const [abroad, setAbroad] = useState(false);
  const [isLoading , setIsLoading] = useState(false)
  
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="lg:w-1/2 w-full p-3 shadow-lg rounded-lg min-h-screen">
        <div className="flex justify-center">
            <img src={'/favicon/favicon.ico'} alt="" />
          </div>
          {!abroad && <MobileLogin abroad={abroad} setAbroad={setAbroad} setIsLoading={setIsLoading}/>}
          {abroad && <NationalIdLogin abroad={abroad} setAbroad={setAbroad} setIsLoading={setIsLoading}/>}
        </div>
        <div className='lg:w-1/2 w-0 h-screen bg-login bg-cover bg-no-repeat bg-[#0008] bg-blend-multiply'/>
      </div>
      {
        isLoading &&
        <SimpleBackdrop />
      }
    </>
  );
}
