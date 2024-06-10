import React, { useContext, useEffect, useState } from 'react';

import axios from 'axios';
import Swal from 'sweetalert2';
import { Button } from '@mui/material';
import { FaArrowRight } from 'react-icons/fa';
import InputNameUpdateProfile from './inputNameUpdateProfile';
import InputLastNameProfileUpdate from './inputLastNameProfileUpdate';
import InputFatherNameUpdateProfile from './inputFatherNameUpdateProfile';
import SelectGenderUpdateProfile from './selectGenderUpdateProfile';
import DatePickerUpdateProfile from './datePickerUpdateProfile';
import InputTelUpdateProfile from './inputTelUpdateProfile';
import SelectCityUpdateProfile from './selectCityUpdateProfile';
import TextareaAddressUpdateProfile from './textareaAddressUpdateProfile';
// import { Account, Change } from '../../pages/_app';
import { mainDomain } from '../../utils/mainDomain';
import SimpleBackdrop from '../backdrop';

export default function FormUpdateProfile({ setPageState, setChang, account, patient }) {
  
  // const account = useContext(Account);
  // const setChange = useContext(Change);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [gender, setGender] = useState('');
  const [date, setDate] = useState('');
  const [tel, setTel] = useState();
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [width, setWidth] = useState('');


  useEffect(() => {
    if (account.firstName) {
      setName(account.firstName);
      setLastName(account.lastName);
      setFatherName(account.fatherName? account.fatherName : '');
      setGender(account.gender);
      setDate(account.dateOfBirthFa);
      setTel(account.tel?account.tel:'');
      setProvince(account.province);
      setCity(account.city);
      setAddress(account.address);
    }
  }, [account]);

  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  // update profile
  const updateProfileHandler = () => {
    if (patient) {
      if (localStorage.getItem('roles') === 'Patient') {
        if (name.length > 2 && lastName.length > 2 && fatherName.length > 2 && date && province && city && address) {
          setIsLoading(true);
          const data = {
            userId: account.userId,
            firstName: name,
            lastName,
            gender,
            abroad: account.abroad,
            fatherName,
            dateOfBirthFa: date,
            tel,
            province,
            city,
            address,
          };
          axios
            .post(`${mainDomain}/api/Patient/Update`, data, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            })
            .then((res) => {
              setIsLoading(false);
              Toast.fire({
                icon: 'success',
                text: 'اطلاعات با موفقیت ذخیره شد',
              });
              setChang((e) => !e);
              // setPageState(0);
            })
            .catch((error) => {
              setIsLoading(false);
              Toast.fire({
                icon: 'error',
                text: error.response ? error.response.data : 'خطای شبکه',
              });
            });
        } else if (name.length <= 2) {
          Toast.fire({
            icon: 'error',
            text: 'لطفا نام خود را به درستی وارد کنید (نام باید بزرگتر از 2 کاراکتر باشد)',
          });
        } else if (lastName.length <= 2) {
          Toast.fire({
            icon: 'error',
            text: 'لطفا نام خانوادگی خود را به درستی وارد کنید (نام خانوادگی باید بزرگتر از 2 کاراکتر باشد)',
          });
        } else if (fatherName.length <= 2) {
          Toast.fire({
            icon: 'error',
            text: 'لطفا نام پدر را به درستی وارد کنید (نام پدر باید بزرگتر از 2 کاراکتر باشد)',
          });
        } else if (!date) {
          Toast.fire({
            icon: 'error',
            text: 'لطفا تاریخ تولد خود را وارد کنید',
          });
        } else if (!province || !city) {
          Toast.fire({
            icon: 'error',
            text: 'لطفا استان و شهر محل سکونت خود را وارد کنید',
          });
        } else if (!address) {
          Toast.fire({
            icon: 'error',
            text: 'لطفا آدرس محل سکونت خود را وارد کنید',
          });
        }
      }
    } else if (!patient) {
      if (localStorage.getItem('roles') === 'Patient') {
        if (name.length > 2 && lastName.length > 2 && fatherName.length > 2 && date && province && city && address) {
          setIsLoading(true);
          const data = {
            userId: account.userId,
            firstName: name,
            lastName,
            gender,
            abroad: account.abroad,
            fatherName,
            dateOfBirthFa: date,
            tel,
            province,
            city,
            address,
          };
          axios
            .post(`${mainDomain}/api/Patient/Update`, data, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            })
            .then((res) => {
              setIsLoading(false);
              Toast.fire({
                icon: 'success',
                text: 'اطلاعات با موفقیت ذخیره شد',
              });
              setChang((e) => !e);
              // setPageState(0);
            })
            .catch((error) => {
              setIsLoading(false);
              Toast.fire({
                icon: 'error',
                text: error.response ? error.response.data : 'خطای شبکه',
              });
            });
        } else if (name.length <= 2) {
          Toast.fire({
            icon: 'error',
            text: 'لطفا نام خود را به درستی وارد کنید (نام باید بزرگتر از 2 کاراکتر باشد)',
          });
        } else if (lastName.length <= 2) {
          Toast.fire({
            icon: 'error',
            text: 'لطفا نام خانوادگی خود را به درستی وارد کنید (نام خانوادگی باید بزرگتر از 2 کاراکتر باشد)',
          });
        } else if (fatherName.length <= 2) {
          Toast.fire({
            icon: 'error',
            text: 'لطفا نام پدر را به درستی وارد کنید (نام پدر باید بزرگتر از 2 کاراکتر باشد)',
          });
        } else if (!date) {
          Toast.fire({
            icon: 'error',
            text: 'لطفا تاریخ تولد خود را وارد کنید',
          });
        } else if (!province || !city) {
          Toast.fire({
            icon: 'error',
            text: 'لطفا استان و شهر محل سکونت خود را وارد کنید',
          });
        } else if (!address) {
          Toast.fire({
            icon: 'error',
            text: 'لطفا آدرس محل سکونت خود را وارد کنید',
          });
        }
      } else if (localStorage.getItem('roles').includes('Staff')) {
        if (name.length > 2 && lastName.length > 2) {
          setIsLoading(true);
          const data = {
            firstName: name,
            lastName,
            gender,
          };
          axios
            .post(`${mainDomain}/api/Staff/Profile/Update`, data, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            })
            .then((res) => {
              setIsLoading(false);
              Toast.fire({
                icon: 'success',
                text: 'اطلاعات با موفقیت ذخیره شد',
              });
              setChang((e) => !e);
            })
            .catch((error) => {
              setIsLoading(false);
              Toast.fire({
                icon: 'error',
                text: error.response ? error.response.data : 'خطای شبکه',
              });
            });
        } else if (name.length <= 2) {
          Toast.fire({
            icon: 'error',
            text: 'لطفا نام خود را به درستی وارد کنید (نام باید بزرگتر از 2 کاراکتر باشد)',
          });
        } else if (lastName.length <= 2) {
          Toast.fire({
            icon: 'error',
            text: 'لطفا نام خانوادگی خود را به درستی وارد کنید (نام خانوادگی باید بزرگتر از 2 کاراکتر باشد)',
          });
        }
      } else if (localStorage.getItem('roles').includes('Doctor') && !patient) {
        if (name.length > 2 && lastName.length > 2) {
          setIsLoading(true);
          const data = {
            firstName: name,
            lastName,
          };
          axios
            .post(`${mainDomain}/api/Doctor/Profile/Update`, data, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            })
            .then((res) => {
              setIsLoading(false);
              Toast.fire({
                icon: 'success',
                text: 'اطلاعات با موفقیت ذخیره شد',
              });
              setChang((e) => !e);
            })
            .catch((error) => {
              setIsLoading(false);
              Toast.fire({
                icon: 'error',
                text: error.response ? error.response.data : 'خطای شبکه',
              });
            });
        } else if (name.length <= 2) {
          Toast.fire({
            icon: 'error',
            text: 'لطفا نام خود را به درستی وارد کنید (نام باید بزرگتر از 2 کاراکتر باشد)',
          });
        } else if (lastName.length <= 2) {
          Toast.fire({
            icon: 'error',
            text: 'لطفا نام خانوادگی خود را به درستی وارد کنید (نام خانوادگی باید بزرگتر از 2 کاراکتر باشد)',
          });
        }
      }
    }
  };

  return (
    <>
      <div className="lg:w-1/2 w-full p-4">
        <div className="border rounded-lg pb-5">
          <div className="flex flex-wrap">
            <InputNameUpdateProfile name={name} setName={setName} setWidth={setWidth} />
            <InputLastNameProfileUpdate lastName={lastName} setLastName={setLastName} />
          </div>
          <div className="flex flex-wrap">
            {(localStorage.getItem('roles') === 'Patient' || patient) && (
              <InputFatherNameUpdateProfile fatherName={fatherName} setFatherName={setFatherName} />
            )}
            {(localStorage.getItem('roles') === 'Patient' || localStorage.getItem('roles').includes('Staff') || patient) && (
              <SelectGenderUpdateProfile setGender={setGender} gender={gender} />
            )}
          </div>
          {(localStorage.getItem('roles') === 'Patient' || patient) && (
            <div>
              <div className="flex flex-wrap">
                <DatePickerUpdateProfile date={date} setDate={setDate} width={width} />
                <InputTelUpdateProfile setTel={setTel} tel={tel} />
              </div>
              <SelectCityUpdateProfile
                province={province}
                setProvince={setProvince}
                setCity={setCity}
                city={city}
                setIsLoading={setIsLoading}
              />
              <TextareaAddressUpdateProfile setAddress={setAddress} address={address} />
            </div>
          )}
          <div className="flex justify-start mt-4 px-5">
            <Button
              onClick={updateProfileHandler}
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
              ذخیره تغییرات
            </Button>
          </div>
        </div>
      </div>
      {isLoading && <SimpleBackdrop />}
    </>
  );
}
