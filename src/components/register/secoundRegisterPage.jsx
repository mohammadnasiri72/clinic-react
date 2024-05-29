import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { IoMdArrowRoundForward } from 'react-icons/io';
import { Button, IconButton, Tooltip } from '@mui/material';
import Swal from 'sweetalert2';
import { Navigate, useNavigate } from 'react-router';
import InputFillCode from './fillCode';
import InputLastName from './inputLName';
import InputName from './inputName';
import InputTimer from './inputTimer';
import SelectGender from './selectGender';
import InputPassword from './inputPassword';
import { mainDomain } from '../../utils/mainDomain';
import SelectAge from './SelectAge';
import Page from '../Page';

export default function SecoundRegisterPage({
  registerModel,
  setIsRegister,
  setIsLoading,
  pageState,
  setPageState,
  pageStateReception,
  setPageStateReception,
}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('m');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [dateOfBirthFaPatient, setDateOfBirthFaPatient] = useState('');
  const [disableEnter, setDisableEnter] = useState(false);

  const navigate = useNavigate();
  const url = '/api/Patient/Register';

  const btnSubmit = useRef(null);
  

  // useEffect(() => {
  //   if (btnSubmit.current) {
  //     document.body.addEventListener('keypress', (ev) => {
  //       const direction = ev.keyCode;
  //       if (isRegister) {
  //         if (direction === 13) {
  //           btnSubmit.current.click();
  //         }
          
  //       }
  //     });
  //   }
  // }, []);

  // const paternPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  const submitHandler = (e) => {
    e.preventDefault();
    registerModel.fristName = firstName;
    registerModel.lastName = lastName;
    registerModel.gender = gender;
    registerModel.password = password;
    registerModel.code = code;
    registerModel.dateOfBirthFa = dateOfBirthFaPatient;
    if (
      firstName.length > 2 &&
      lastName.length > 2 &&
      gender.length !== 0 &&
      code.length === 6 &&
      dateOfBirthFaPatient.length !== 0 &&
      (registerModel.abroad === false || password.length > 6)
    ) {
      setIsLoading(true);
      axios
        .post(mainDomain + url, registerModel)
        .then((response) => {
          setIsLoading(false);
          if (!pageState && !pageStateReception) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('roles', response.data.roles);
            localStorage.setItem('expiration', response.data.expiration);
            setDisableEnter(false)
            Toast.fire({
              icon: 'success',
              text: 'ثبت نام شما با موفقیت انجام شد',
            });
            setTimeout(() => {
              navigate('/dashboard')
            }, 1000);
          }
          // response.setHeader("Set-Cookie", serialize("token", fristName , {
          //   httpOnly:true,
          //   path:"/",
          //   maxAge:60*60*24
          // }))
          else {
            setDisableEnter(false)
            Toast.fire({
              icon: 'success',
              text: 'ثبت نام بیمار با موفقیت انجام شد',
            });
            if (!pageState) {
              setPageStateReception(1);
            }
            if (!pageStateReception) {
              setPageState(0);
            }
            setIsRegister(false);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setDisableEnter(false)
          Toast.fire({
            icon: 'error',
            text: err.response ? err.response.data : 'خطای شبکه',
          });
        });
    } else if (firstName.length <= 2) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا نام خود را به درستی وارد کنید(نام باید بیشتر از دو حرف باشد)',
      });
    } else if (lastName.length < 2) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا نام خانوادگی خود را به درستی وارد کنید(نام خانوادگی باید بیشتر از دو حرف باشد)',
      });
    } else if (gender.length === 0) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا جنسیت خود را به درستی وارد کنید(جنسیت نمیتواند خالی باشد)',
      });
    } else if (dateOfBirthFaPatient.length === 0) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا تاریخ تولد را به وارد کنید',
      });
    } else if (registerModel.abroad === true && password.length <= 6) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا پسورد خود را به درستی وارد کنید(پسورد باید بیشتر از 6 رقم باشد)',
      });
    } else if (code.length !== 6) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا کد ارسال شده را به درستی وارد کنید(کد ارسال شده باید 6 رقم باشد)',
      });
    }
  };

  return (
    <>
      <Page 
      // onKeyDown={(e) => {
      //     if (e.keyCode === 13 && !disableEnter) {
      //       btnSubmit.current.click();
      //     }
      //   }} 
        className="flex justify-center items-center min-h-screen">
        <div className="lg:w-1/2 w-full p-3 shadow-lg rounded-lg min-h-screen">
          <div className="flex justify-center">
            <img src={'/favicon/favicon.ico'} alt="" />
          </div>
          <div className="text-start px-5">
            {/* <button
              type="button"
              onClick={() => setIsRegister(false)}
              className="bg-blue-500 px-5 py-2 text-white rounded-md flex items-center duration-300 hover:bg-blue-600"
            >
              {' '}
              <IoMdArrowRoundForward className="pt-2 text-3xl" />
              <span>مرحله قبل</span>
            </button> */}
            <Tooltip title="مرحله قبل">
              <IconButton onClick={() => {
                setIsRegister(false)}
              } >
                <IoMdArrowRoundForward className="text-3xl" />
              </IconButton>
            </Tooltip>
          </div>

          <div className=" mt-5">
            <InputName fristName={firstName} setFristName={setFirstName} />
            <InputLastName lastName={lastName} setLastName={setLastName} />
            <SelectGender gender={gender} setGender={setGender} />
            <SelectAge setDateOfBirthFaPatient={setDateOfBirthFaPatient} />
            {registerModel.abroad && <InputPassword setPassword={setPassword} password={password} />}
            <InputFillCode setCode={setCode} btnSubmit={btnSubmit} setDisableEnter={setDisableEnter}/>
            <div className="px-5 mx-auto lg:w-2/3 w-full mt-4">
              <div className="px-2 rounded-md flex items-center">
                <Button
                  sx={{
                    py: 1,
                    fontSize: 20,
                    backgroundColor: 'rgb(16 185 129)',
                    '&:hover': {
                      backgroundColor: 'rgb(5 150 105)',
                    },
                  }}
                  className="w-full text-white px-5 py-2"
                  onClick={submitHandler}
                  ref={btnSubmit}
                  variant="contained"
                >
                  تایید
                </Button>
              </div>
            </div>
            <div className="text-start px-5 mx-auto lg:w-2/3 w-full mt-3 text-xs">
              <InputTimer registerModel={registerModel} setIsLoading={setIsLoading} />
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 w-0 h-screen bg-login bg-cover bg-no-repeat bg-[#0008] bg-blend-multiply" />
      </Page>
    </>
  );
}
