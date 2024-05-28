import axios from 'axios';
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';

export default function BoxDateReserve({ doctorId, setDates, setIsLoading, setDateReserved }) {
  const [dateFa, setDateFa] = useState([]);

  useEffect(() => {
    if (doctorId) {
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
          setDateFa(res.data);
        })
        .catch((err) => {});
    }
  }, [doctorId]);
  const selectDateHandler = (e) => {
    setDateReserved(e.target.value);
    setIsLoading(true);
    axios
      .get(`${mainDomain}/api/ReservationTime/GetList`, {
        params: {
          doctorId,
          dateFa: e.target.value,
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
        <div className='sticky top-0 left-0 right-0 w-full bg-white mb-4 z-50'>
        <h2 className='font-semibold '>انتخاب تاریخ</h2>
        </div>
        <div className="  flex lg:block px-3 pb-5">
          {dateFa.map((date) => (
            <div key={date.dateFa} className="p-1">
              <Button
                sx={{
                  py: 1,
                  boxShadow:'none',
                  // fontSize: 20,
                  backgroundColor: 'rgb(16 185 129)',
                  '&:hover': {
                    backgroundColor: 'rgb(5 150 105)',
                  },
                }}
                className="p-2 rounded-md duration-300 mt-2 w-28"
                onClick={selectDateHandler}
                value={date.dateFa}
                variant="contained"
              >
                {date.dateFa}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
