import React, { useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persianFa from 'react-date-object/locales/persian_fa';

export default function SelectDate({ setFromPersianDate, setToPersianDate }) {
  const [date, setDate] = useState(new Date().toLocaleDateString('fa-IR'));

  return (
    <>
      <div className="px-4">
        <DatePicker
          range
          dateSeparator=" تا "
          inputClass="outline-none border rounded-lg w-full h-14 px-3"
          locale={persianFa}
          calendar={persian}
          value={date}
          onChange={(event, { validatedValue }) => {
            setDate(event);
            setFromPersianDate(validatedValue[0]);
            setToPersianDate(validatedValue[1] ? validatedValue[1] : validatedValue[0]);
          }}
          placeholder="تاریخ پذیرش"
        />
      </div>
    </>
  );
}
