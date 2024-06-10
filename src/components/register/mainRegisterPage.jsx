import { Button, Paper } from '@mui/material';
import axios from 'axios';
import { useRef, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';
import Page from '../Page';
import InputMobilEmail from './inputMobil_Email';
import InputNationalId from './inputNationalId';
import SelectAbroad from './selectAbroad';

export default function MainRegisterPage({ setIsRegister, setRegisterModel, setIsLoading, setPageState }) {
  const [abroad, setAbroad] = useState(false);
  const [nationalId, setNationalId] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');

  const paternNationalId = /^[0-9]{10}$/;
  const paternMobile = /09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/;
  const paternEmail = /[a-zA-Z0-9.-]+@[a-z-]+\.[a-z]{2,3}/;

  const inpNextRef = useRef(null);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  // register patient
  const submitForm = () => {
    const registerModel = {
      nationalId,
      abroad,
      mobile,
      email,
    };
    if (nationalId.match(paternNationalId) && (mobile.match(paternMobile) || email.match(paternEmail))) {
      setIsLoading(true);
      setRegisterModel(registerModel);
      axios
        .post(`${mainDomain}/api/Patient/PreRegister`, registerModel)
        .then(() => {
          setIsLoading(false);
          setIsRegister(true);
          Toast.fire({
            icon: 'success',
            text: 'کد ارسال شد لطفا اطلاعات خود را تکمیل کنید',
          });
        })
        .catch((err) => {
          setIsLoading(false);
          Toast.fire({
            icon: 'error',
            text: err.response ? err.response.data : 'خطای شبکه',
          });
        });
    }
    if (!abroad && !mobile.match(paternMobile)) {
      Toast.fire({
        icon: 'error',
        text: ' شماره موبایل نا معتبر است',
      });
    }
    if (abroad && !email.match(paternEmail)) {
      Toast.fire({
        icon: 'error',
        text: ' ایمیل نا معتبر است',
      });
    }
    if (!nationalId.match(paternNationalId)) {
      Toast.fire({
        icon: 'error',
        title: 'کد ملی نامعتبر است',
      });
    }
  };


  return (
    <>
      <Paper
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            inpNextRef.current.click();
          }
        }}
        className="flex justify-center items-center min-h-screen"
      >
        <div className={setPageState? 'bg-slate-100 w-full p-3 shadow-lg rounded-lg min-h-screen' : "lg:w-1/2 w-full bg-slate-100 p-3 shadow-lg rounded-lg min-h-screen"}>
          <div className="flex justify-center">
            <img src={'/favicon/lgo.png'} alt="logo" />
          </div>
          <h1 className="text-3xl mt-4">ثبت نام بیمار</h1>
          <SelectAbroad abroad={abroad} setAbroad={setAbroad} setMobile={setMobile} setEmail={setEmail} />
          <InputNationalId nationalId={nationalId} setNationalId={setNationalId} />
          <InputMobilEmail abroad={abroad} email={email} setEmail={setEmail} mobile={mobile} setMobile={setMobile} />
          <div className="flex justify-center">
            <div className="px-3 mt-10 lg:w-2/3 w-full mx-auto ">
              <Button
                ref={inpNextRef}
                sx={{
                  py: 1,
                  fontSize: 20,
                  backgroundColor: 'rgb(16 185 129)',
                  '&:hover': {
                    backgroundColor: 'rgb(5 150 105)',
                  },
                }}
                className="bg-blue-400 rounded-md text-white duration-300 w-full"
                onClick={submitForm}
                variant="contained"
              >
                مرحله بعد
              </Button>
            </div>
          </div>
          {!setPageState && (
            <div className="px-3 mt-5 text-start lg:w-2/3 w-full mx-auto">
              <Button
                size="medium"
                className="px-5 py-2 rounded-md text-white duration-300"
                sx={{
                  py: 1,
                  fontSize: 16,
                  backgroundColor: 'rgb(20 184 166)',
                  '&:hover': {
                    backgroundColor: 'rgb(13 148 136)',
                  },
                }}
                variant="contained"
              >
                <Link to={'/login'}>قبلا حساب ساخته ام</Link>
              </Button>
            </div>
          )}
          {setPageState && (
            <div className="px-3 mt-5 text-start lg:w-2/3 w-full mx-auto">
              <Button
                sx={{
                  py: 1,
                  fontSize: 16,
                  backgroundColor: 'rgb(20 184 166)',
                  '&:hover': {
                    backgroundColor: 'rgb(13 148 136)',
                  },
                }}
                className="rounded-md duration-300 mt-2"
                onClick={() => setPageState(0)}
                variant="contained"
              >
                <FaArrowRight className="text-white" />
                <span className="px-2 text-white">برگشت به صفحه قبل</span>
              </Button>
            </div>
          )}
        </div>
        {!setPageState && (
          <div className="lg:w-1/2 w-0 h-screen bg-login bg-cover bg-no-repeat bg-[#0008] bg-blend-multiply" />
        )}
      </Paper>
    </>
  );
}
