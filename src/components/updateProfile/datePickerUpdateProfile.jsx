import React, { useEffect, useRef } from 'react';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persianFa from 'react-date-object/locales/persian_fa';

export default function DatePickerUpdateProfile({ date, setDate , width , setScrollTopInpBirth}) {
  const inpBirth = useRef(null)
  useEffect(()=>{
    setScrollTopInpBirth(inpBirth.current.offsetTop)
  },[inpBirth])
  return (
    <>
      <div className="sm:w-1/2 w-full mt-6">
        <DatePicker
        style={{ width: `${width}px`}}
        ref={inpBirth}
          inputClass="outline-none border rounded-lg min-w-full h-14 px-3"
          locale={persianFa}
          calendar={persian}
          value={date}
          onChange={(e)=>{
            if (e) {
              setDate(e.format())
            }
            else{
              setDate('')
            }
          }}
          placeholder="تاریخ تولد خود را وارد کنید"
        />
      </div>
    </>
  );
}
