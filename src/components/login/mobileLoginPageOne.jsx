import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';
import SelectAbroadLogin from './SelectAbroadLogin';

export default function MobileLoginPageOne({
  mobileNumber,
  setMobileNumber,
  setIsValiedMobile,
  abroad,
  setAbroad,
  setIsLoading,
}) {
  const paternMobile = /^09[0|1|2|3|9][0-9]{8}$/;
  const url = '/api/Authenticate/SendOtp'
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
  let colorMobile;
  if (mobileNumber.match(paternMobile)) {
    colorMobile = 'success';
  } else if (mobileNumber.length === 0) {
    colorMobile = 'primary';
  } else {
    colorMobile = 'error';
  }
  const mobileNumberData = new FormData();
  mobileNumberData.append('mobileNumber', mobileNumber);
  const sendData = () => {
    if (mobileNumber.match(paternMobile)) {
      setIsLoading(true);
      axios
        .post(mainDomain + url , mobileNumberData)
        .then((res) => {
          setIsLoading(false);
          if (res.status === 200) {
            setIsValiedMobile(true);
            Toast.fire({
              icon: 'success',
              text: 'لطفا کد 6 رقمی ارسال شده را وارد کنید',
            });
          }
        })
        .catch((err) => {
          setIsLoading(false);
          Toast.fire({
            icon: 'error',
            text: err.response ? err.response?.data : 'خطای شبکه',
          });
        });
    } else {
      Toast.fire({
        icon: 'error',
        text: 'لطفا شماره موبایل خود را به درستی وارد کنید',
      });
    }
  };
  return (
    <>
      <h2 className="text-3xl">صفحه ورود</h2>
      <SelectAbroadLogin abroad={abroad} setAbroad={setAbroad} />
      <div className="px-5 lg:w-2/3 w-full mx-auto mt-5">
        <TextField
          onChange={(e) => setMobileNumber(e.target.value)}
          value={mobileNumber}
          className="w-full text-white"
          id="outlined-multiline-flexible"
          label={'شماره موبایل'}
          multiline
          color={colorMobile}
          maxRows={4}
          // InputProps={{className:'textfield-style'}}
        />
        <div>
          <div className=" mt-4">
            <Button
              sx={{
                py: 1,
                fontSize: 20,
                backgroundColor: 'rgb(16 185 129)',
                '&:hover': {
                  backgroundColor: 'rgb(5 150 105)',
                },
              }}
              onClick={sendData}
              className="rounded-md w-full text-white mt-5 duration-300"
              variant="contained"
            >
              مرحله بعد
            </Button>
          </div>
          <div className="text-start mt-4 ">
            <Button
              size="medium"
              sx={{
                py: 1,
                fontSize: 16,
                backgroundColor: 'rgb(20 184 166)',
                '&:hover': {
                  backgroundColor: 'rgb(13 148 136)',
                },
              }}
              className="rounded-md  text-white mt-5 duration-300"
              variant="contained"
            >
              <Link to={'/register'}>ساخت حساب جدید</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
