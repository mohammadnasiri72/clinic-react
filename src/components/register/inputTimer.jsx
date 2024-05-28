import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';

export default function InputTimer({ registerModel, setIsLoading }) {
  const [timeResendCode, setTimeResendCode] = useState(120);
  const [showBtnSendCode, setShowBtnSendCode] = useState(false);
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
  const url = '/api/Patient/PreRegister'
  useEffect(() => {
    setTimeout(() => {
      setTimeResendCode(timeResendCode - 1);
      if (timeResendCode < 1) {
        setTimeResendCode(0);
        setShowBtnSendCode(true);
      }
    }, 1000);
  }, [timeResendCode]);
  const resendCodeHandler = () => {
    setTimeResendCode(120);
    setShowBtnSendCode(false);
    setIsLoading(true);
    axios
      .post(mainDomain + url , registerModel)
      .then(() => {
        setIsLoading(false);
        Toast.fire({
          icon: 'success',
          text: 'کد شش رقمی ارسال شد',
        });
      })
      .catch((error) => {
        setIsLoading(false);
        Toast.fire({
          icon: 'error',
          text: error.response.data,
        });
      });
  };
  return (
    <>
      <div className="px-2">
        {!showBtnSendCode && (
          <button type="button" disabled className="bg-blue-500 text-[#fff8] px-5 py-2 rounded-md cursor-not-allowed">
            تا ارسال مجدد: {timeResendCode} ثانیه
          </button>
        )}
        {showBtnSendCode && (
          <button type="button" onClick={resendCodeHandler} className="bg-blue-500 text-white px-5 py-2 rounded-md">
            ارسال مجدد کد
          </button>
        )}
      </div>
    </>
  );
}
