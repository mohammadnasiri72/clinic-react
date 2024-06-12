/* eslint-disable no-nested-ternary */
import axios from 'axios';
import { Button, Skeleton, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';

export default function BoxDateReserve({ doctorId, setDates, setIsLoading, setDateReserved }) {
  const [dateFa, setDateFa] = useState([]);
  const [alignment, setAlignment] = useState('');

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  useEffect(() => {
    if (doctorId) {
      setIsLoading(true);
      axios
        .get(`${mainDomain}/api/ReservationTime/GetList`, {
          params: {
            doctorId,
            dateFa: '',
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setIsLoading(false);
          setDateFa(res.data);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  }, [doctorId]);

  const selectDateHandler = (e) => {
    setDateReserved(e);
    setIsLoading(true);
    axios
      .get(`${mainDomain}/api/ReservationTime/GetList`, {
        params: {
          doctorId,
          dateFa: e,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setDates(res.data[0].reservationTimes);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="lg:h-[80vh] overflow-auto relative">
        <div className="sticky top-0 left-0 right-0 bottom-0 w-full bg-white mb-4 z-50">
          <h2 className="font-semibold">انتخاب تاریخ</h2>
        </div>
        <ToggleButtonGroup
         value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <div className="  flex lg:block px-3 pb-5">
          {dateFa.length > 0 &&
            dateFa.map((date) => (
              <div key={date.dateFa} className="p-1">
                <ToggleButton 
                  sx={{
                    py: 1,
                    boxShadow: 'none',
                    backgroundColor: 'rgb(20 184 166)',
                    '&:hover': {
                      backgroundColor: 'rgb(13 148 136)',
                    },
                  }}
                  value={date.dateFa}
                  className="p-2 rounded-md duration-300 mt-2 w-28"
                  onClick={()=> selectDateHandler(date.dateFa)}
                  variant="contained"
                >
                 
                  <div className="flex flex-col text-zinc-600">
                    <p>{date.dateFa}</p>
                    <p>
                      {date.dayName === 'saturday'
                        ? 'شنبه'
                        : date.dayName === 'sunday'
                        ? 'یکشنبه'
                        : date.dayName === 'monday'
                        ? 'دوشنبه'
                        : date.dayName === 'tuesday'
                        ? 'سه‌شنبه'
                        : date.dayName === 'wednesday'
                        ? 'چهارشنبه'
                        : date.dayName === 'thursday'
                        ? 'پنجشنبه'
                        : 'جمعه'}
                    </p>
                  </div>
                </ToggleButton >
              </div>
            ))}
             
          {dateFa.length === 0 && (
            <div className="w-full">
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
            </div>
          )}
        </div>
        </ToggleButtonGroup>
      </div>
    </>
  );
}
