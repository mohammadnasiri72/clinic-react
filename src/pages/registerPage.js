import React, { useState } from "react";
import MainRegisterPage from "../components/register/mainRegisterPage";
import SecoundRegisterPage from "../components/register/secoundRegisterPage";
import SimpleBackdrop from "../components/backdrop";


function Register() {
  const [isRegister , setIsRegister] = useState(false)
  const [registerModel , setRegisterModel] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <>
    {
        !isRegister&&
        <MainRegisterPage setIsRegister={setIsRegister} setRegisterModel={setRegisterModel} setIsLoading={setIsLoading}/>
    }
    {
        isRegister&& 
        <SecoundRegisterPage registerModel={registerModel} setIsRegister={setIsRegister} setIsLoading={setIsLoading}/>
    }
    {
        isLoading && 
        <SimpleBackdrop />
      }
    </>
  );
}

export default Register;


