import React, { useState } from 'react';
import { Container } from '@mui/material';
import NationalIdLogin from './nationalIdLogin';
import MobileLogin from './mobileLogin';
import SimpleBackdrop from '../backdrop';
import Page from '../Page';
import useSettings from '../../hooks/useSettings';

export default function MainLoginPage() {
  const [abroad, setAbroad] = useState(false);
  const [isLoading , setIsLoading] = useState(false)
  const { themeStretch } = useSettings();
  
  
  
  return (
    <>
    <Page title="ورود">
        
      <div className="flex justify-center items-center min-h-screen">
        <div className="lg:w-1/2 w-full p-3 min-h-screen bg-slate-100">
        <div className="flex justify-center mb-5">
            <img src={'/favicon/lgo.png'} alt="" />
          </div>
          {!abroad && <MobileLogin abroad={abroad} setAbroad={setAbroad} setIsLoading={setIsLoading}/>}
          {abroad && <NationalIdLogin abroad={abroad} setAbroad={setAbroad} setIsLoading={setIsLoading}/>}
        </div>
        <div className='lg:w-1/2 w-0 h-screen bg-login bg-cover bg-no-repeat bg-[#0002] bg-blend-multiply'/>
      </div>
      {
        isLoading &&
        <SimpleBackdrop />
      }
      </Page>
    </>
  );
}
