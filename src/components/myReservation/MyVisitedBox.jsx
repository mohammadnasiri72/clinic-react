import { IoCalendarOutline } from 'react-icons/io5';
import { Button } from '@mui/material';
import React from 'react';
import { IoMdTime } from 'react-icons/io';
import { mainDomain } from '../../utils/mainDomain';
import FormHistoryVisit from '../VisitHistory/FormHistoryVisit';

export default function MyVisitedBox({ list, doctor , setPageStateMyReserv}) {

  return (
    <>
      <div className="flex items-center">
        <div className="w-1/3 p-3">
          <div className="w-16 h-16 border rounded-full cursor-pointer">
            <img className="w-full h-full rounded-full" src={mainDomain + doctor?.avatar} alt="" />
          </div>
        </div>
        <div className="w-2/3">
          <p className="lg:text-sm text-sm font-semibold whitespace-nowrap">
            {doctor?.firstName} {doctor?.lastName}
          </p>
          <p className="mt-5 font-semibold text-sm">{doctor?.specialization}</p>
        </div>
      </div>
      <div className="px-10 mt-6">
        <div className="flex items-center mt-2">
          
          <IoCalendarOutline className='text-2xl'/>
          <p className="px-2">{list.reservationTimeDateFA}</p>
        </div>
        <div className="flex items-center mt-2">
          
          <IoMdTime className='text-2xl'/>
          <p className="px-2 whitespace-nowrap">
            {list.reservationTimeFromTime.slice(0,5)} الی {list.reservationTimeToTime.slice(0,5)}
          </p>
        </div>
      </div>
      <div className='text-start pb-3 mt-3 pr-3'>
      <Button
          size='small'
            sx={{
              py: 1,
              boxShadow: 'none',
              fontSize: 12,
              color: 'white',
              backgroundColor: 'rgb(20 184 166)',
              '&:hover': {
                backgroundColor: 'rgb(13 148 136)',
              },
            }}
            className="rounded-md duration-300 mt-2 whitespace-nowrap"
            onClick={()=> setPageStateMyReserv(true)}
            variant="contained"
          >
          مشاهده جزئیات
          </Button>
      </div>

     
    </>
  );
}
