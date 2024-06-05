import React, { useEffect, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { Button } from '@mui/material';
import axios from 'axios';
import InputFullName from './InputFullName';
import InputRelative from './InputRelative';
import InputMobileRelative from './InputMobileRelative';
import InputAddress from './InputAddress';
import InputDesc from './InputDesc';
import { mainDomain } from '../../utils/mainDomain';
import SimpleBackdrop from '../backdrop';

export default function AddRelativePatient({ isOpenAddRelative, setIsOpenAddRelative, patient , editRelative}) {
  const [fullName, setFullName] = useState('');
  const [relative, setRelative] = useState('');
  const [mobileRelative, setMobileRelative] = useState('');
  const [addressRelative, setAddressRelative] = useState('');
  const [descRelative, setDescRelative] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  useEffect(()=>{
    if (editRelative.fullName) {
      setFullName(editRelative.fullName)
    }
    if (editRelative.relative) {
      setRelative(editRelative.relative)
    }
    if (editRelative.mobileNumber) {
      setMobileRelative(editRelative.mobileNumber)
    }
    if (editRelative.address) {
      setAddressRelative(editRelative.address)
    }
    if (editRelative.description) {
      setDescRelative(editRelative.description)
    }
  },[editRelative])

  const paternMobile = /^09[0|1|2|3|9][0-9]{8}$/;

  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  // set new relative
  const setNewRelativeHandler = () => {
    if (fullName.length > 0 && relative.length > 0 && mobileRelative.match(paternMobile)) {
      setIsLoading(true);
      const data = {
        patientId: patient.patientId,
        fullName,
        relative,
        mobileNumber: mobileRelative,
        address: addressRelative,
        description: descRelative,
      };
      axios
        .post(`${mainDomain}/api/PatientRelative/Add`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setIsOpenAddRelative(false);
          setIsLoading(false);
          setFullName('');
          setRelative('');
          setMobileRelative('');
          setAddressRelative('');
          setDescRelative('');
          Toast.fire({
            icon: 'success',
            text: 'بیمار با موفقیت ثبت شد',
          });
        })
        .catch((err) => {
          setIsLoading(false);
        });
    } else if (fullName.length === 0) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا نام همراه را وارد کنید',
      });
    } else if (relative.length === 0) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا نسبت همراه با بیمار را وارد کنید',
      });
    } else if (!mobileRelative.match(paternMobile)) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا شماره موبایل همراه را بصورت صحیح وارد کنید',
      });
    }
  };

  // edit relative patient
  const editRelativeHandler = () => {
    if (fullName.length > 0 && relative.length > 0 && mobileRelative.match(paternMobile)) {
      setIsLoading(true);
      const data = {
        patientRelativeId: editRelative.patientRelativeId,
        fullName,
        relative,
        mobileNumber: mobileRelative,
        address: addressRelative,
        description: descRelative,
      };
      axios
        .post(`${mainDomain}/api/PatientRelative/Update`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setIsOpenAddRelative(false);
          setIsLoading(false);
          setFullName('');
          setRelative('');
          setMobileRelative('');
          setAddressRelative('');
          setDescRelative('');
          Toast.fire({
            icon: 'success',
            text: 'بیمار با موفقیت ویرایش شد',
          });
        })
        .catch((err) => {
          setIsLoading(false);
        });
    } else if (fullName.length === 0) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا نام همراه را وارد کنید',
      });
    } else if (relative.length === 0) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا نسبت همراه با بیمار را وارد کنید',
      });
    } else if (!mobileRelative.match(paternMobile)) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا شماره موبایل همراه را بصورت صحیح وارد کنید',
      });
    }
  };

 
  return (
    <>
      <div
        style={{ zIndex: '1301', transform: isOpenAddRelative ? 'translateX(0)' : 'translateX(-100%)' }}
        className="fixed top-0 bottom-0 lg:right-2/3 sm:right-1/2 right-0 left-0 bg-slate-50 duration-500 p-5 shadow-lg overflow-y-auto"
      >
        <div className="relative">
          {/* <button
            onClick={() => {
              setIsOpenAddRelative(false);
            }}
            className="bg-slate-200 rounded-full p-3 duration-300 hover:bg-slate-300 absolute right-0 top-0"
          >
            <FaChevronRight
              style={{ transform: isOpenAddRelative ? 'rotate(0deg)' : 'rotate(180deg)' }}
              className="text-xl text-slate-700"
            />
          </button> */}
          <Button
            sx={{
              py: 2,
              boxShadow: 'none',
              // fontSize: 20,
              backgroundColor: 'rgb(100 116 139)',
              '&:hover': {
                backgroundColor: 'rgb(71 85 105)',
              },
            }}
            className="rounded-md duration-300 mt-2"
            onClick={() => {
              setIsOpenAddRelative(false);
            }}
            variant="contained"
          >
            <FaChevronRight
              style={{ transform: isOpenAddRelative ? 'rotate(0deg)' : 'rotate(180deg)' }}
              className="text-xl text-slate-700"
            />
          </Button>
          <div className="text-center py-2 text-2xl font-semibold">
            {
              editRelative.patientId && 
              <span>ویرایش همراه</span>
            }
            {
              !editRelative.patientId && 
              <span>ثبت همراه جدید</span>
            }
            
          </div>
        </div>
        <InputFullName fullName={fullName} setFullName={setFullName} />
        <InputRelative relative={relative} setRelative={setRelative} />
        <InputMobileRelative mobileRelative={mobileRelative} setMobileRelative={setMobileRelative} />
        <InputAddress addressRelative={addressRelative} setAddressRelative={setAddressRelative} />
        <InputDesc descRelative={descRelative} setDescRelative={setDescRelative} />
        <div className="mt-6 text-start pb-10">
          {/* <button
            onClick={setNewRelativeHandler}
            className="text-white bg-green-500 rounded-md duration-300 hover:bg-green-600 px-5 py-2"
          >
            ثبت همراه
          </button> */}
          {
            !editRelative.patientId &&
          <Button
            sx={{
              py: 2,
             mb:2,
              boxShadow: 'none',
              backgroundColor: 'rgb(16 185 129)',
              '&:hover': {
                backgroundColor: 'rgb(5 150 105)',
              },
            }}
            className="rounded-md duration-300 mt-2"
            onClick={setNewRelativeHandler}
            variant="contained"
          >
            ثبت همراه
          </Button>

          }
          {
            editRelative.patientId &&

          <Button
            sx={{
              py: 2,
              boxShadow: 'none',
              // fontSize: 20,
              backgroundColor: 'rgb(16 185 129)',
              '&:hover': {
                backgroundColor: 'rgb(5 150 105)',
              },
            }}
            className="rounded-md duration-300 mt-2"
            onClick={editRelativeHandler}
            variant="contained"
          >
            ویرایش
          </Button>
          }
        </div>
      </div>
      {isLoading && <SimpleBackdrop />}
    </>
  );
}
