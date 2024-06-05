import { TextField } from '@mui/material';
import React from 'react';
import { mainDomain } from '../../utils/mainDomain';
import TablePatient from '../patientList/TablePatient';

export default function InformationPatient({ infoPat, setIsLoading, isLoading }) {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="lg:w-1/6 w-full">
          <img className="w-20 h-20 rounded-full border" src={mainDomain + infoPat.avatar} alt="" />
        </div>
        <div className="lg:w-5/12 w-full">
          <div className=" text-start mt-3" dir="rtl">
            <TextField
              disabled
              className="lg:w-2/3 w-3/4 text-end"
              id="outlined-multiline-flexible"
              label="نام و نام خانوادگی بیمار"
              multiline
              dir="rtl"
              value={infoPat.firstName ? `${infoPat.firstName} ${infoPat.lastName}` : '_____'}
              maxRows={4}
            />
          </div>
          <div className=" text-start mt-3" dir="rtl">
            <TextField
              disabled
              className="lg:w-2/3 w-3/4 text-end"
              id="outlined-multiline-flexible"
              label="کد ملی بیمار"
              multiline
              dir="rtl"
              value={infoPat.nationalId ? infoPat.nationalId : '_____'}
              maxRows={4}
            />
          </div>
          <div className=" text-start mt-3" dir="rtl">
            <TextField
              disabled
              className="lg:w-2/3 w-3/4 text-end"
              id="outlined-multiline-flexible"
              label="نام پدر"
              multiline
              dir="rtl"
              value={infoPat.fatherName ? infoPat.fatherName : '_____'}
              maxRows={4}
            />
          </div>
          <div className=" text-start mt-3" dir="rtl">
            <TextField
              disabled
              className="lg:w-2/3 w-3/4 text-end"
              id="outlined-multiline-flexible"
              label="شماره موبایل"
              multiline
              dir="rtl"
              value={infoPat.userPhoneNumber ? infoPat.userPhoneNumber : '_____'}
              maxRows={4}
            />
          </div>
        </div>
        <div className="lg:w-5/12 w-full">
          <div className=" text-start mt-3" dir="rtl">
            <TextField
              disabled
              className="lg:w-2/3 w-3/4 text-end"
              id="outlined-multiline-flexible"
              label="تاریخ تولد"
              multiline
              dir="rtl"
              value={infoPat.dateOfBirthFa ? infoPat.dateOfBirthFa : '_____'}
              maxRows={4}
            />
          </div>
          <div className=" text-start mt-3" dir="rtl">
            <TextField
              disabled
              className="lg:w-2/3 w-3/4 text-end"
              id="outlined-multiline-flexible"
              label="استان و شهر محل سکونت"
              multiline
              dir="rtl"
              value={infoPat.province ? `${infoPat.province} / ${infoPat.city}` : '_____'}
              maxRows={4}
            />
          </div>
          <div className=" text-start mt-3" dir="rtl">
            <TextField
              disabled
              className="lg:w-2/3 w-3/4 text-end"
              id="outlined-multiline-flexible"
              label="آدرس"
              multiline
              dir="rtl"
              value={infoPat.address ? infoPat.address : '_____'}
              minRows={4}
            />
          </div>
        </div>
      </div>
      <div className="w-5/6 mx-auto">
        <TablePatient infoPat={infoPat} setIsLoading={setIsLoading} isLoading={isLoading} />
      </div>
    </>
  );
}
