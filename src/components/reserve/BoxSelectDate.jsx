import Swal from 'sweetalert2';
import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import axios from 'axios';
import SimpleBackdrop from '../backdrop';
// import { Account } from '../../pages/_app';
import { mainDomain } from '../../utils/mainDomain';

export default function BoxSelectDate({
  dates,
  dateReserved,
  setIsLoading,
  doctor,
  setPageState,
  account,
}) {
  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  const navigate = useNavigate();

  // const account = useContext(Account);
  // const route = useRouter();
  const setTimeHandler = (e) => {
    Swal.fire({
      title: 'ثبت نوبت',
      text: `شما تاریخ${dateReserved} و زمان ${e.fromTime} تا ${e.toTime} را برای دکتر ${doctor.firstName} ${doctor.lastName} انتخاب کردین`,

      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      cancelButtonText: 'انصراف',
      confirmButtonText: 'ثبت نهایی',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const reserveData = {
          patientUserId: account.userId,
          reservationTimeId: e.reservationTimeId,
          description: e.description,
        };
        axios
          .post(`${mainDomain}/api/Reservation/Add`, reserveData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((res) => {
            setIsLoading(false);
            Toast.fire({
              icon: 'success',
              text: 'درخواست شما با موفقیت ثبت شد',
            });
            
            if (setPageState) {
              setPageState(4);
            } else {
              navigate('/dashboard/viewReservation');
            }
          })
          .catch((err) => {
            setIsLoading(false);
            Toast.fire({
              icon: 'error',
              text: err.response ? err.response.data : 'خطای شبکه',
            });
          });
      }
    });
  };
  return (
    <>
      <div className="lg:h-[85vh] border p-3 rounded-md overflow-auto flex flex-wrap justify-center">
        <div className='w-full'>
        <div className='sticky top-0 left-0 right-0 w-full bg-white mb-4 z-50'>
        <h3 className="text-xl font-semibold">
            {dates.length !== 0 ? 'لطفا زمان مورد نظر خود را ثبت کنید' : 'لطفا تاریخ ورود خود را وارد کنید'}
          </h3>
        </div>
          
          <div className="flex flex-wrap w-full">
            {dates.map((date) => (
              <div key={date.reservationTimeId} className="p-3 md:w-1/5 sm:w-1/4 w-1/2 flex">
                <Button
                  disabled={!date.isActive}
                  // style={{ backgroundColor: date.isActive ? 'rgb(20 184 166)' : 'rgb(203 213 225)' }}
                  sx={{
                    py: 1,
                    boxShadow:'none',
                    // fontSize: 20,
                    backgroundColor: date.isActive ? 'rgb(20 184 166)' : 'rgb(203 213 225)' ,
                    '&:hover': {
                      backgroundColor: 'rgb(13 148 136)',
                    },
                  }}
                  className="p-3 w-full bg-teal-600 rounded-md duration-300  text-white"
                  onClick={() => {
                    setTimeHandler(date);
                  }}
                  value={date.fromTime}
                  variant="contained"
                >
                  {date.toTime.slice(0, 5)} - {date.fromTime.slice(0, 5)}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
