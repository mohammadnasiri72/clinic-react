import { Button, IconButton, Tooltip } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaTrashAlt } from "react-icons/fa";
import { mainDomain } from '../../utils/mainDomain';

export default function MyReserveBox({ list, doctor, setFlag, setIsLoading, setPageState }) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  const deleteReservationHandler = () => {
    const reservationIdData = new FormData();
    reservationIdData.append('reservationId', list.reservationId);
    Swal.fire({
      title: 'حذف نوبت',
      text: 'آیا از ثبت درخواست خود مطمئن هستید؟',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'green',
      cancelButtonText: 'انصراف',
      confirmButtonText: 'حذف نوبت',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        axios
          .post(`${mainDomain}/api/Reservation/Delete`, reservationIdData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((res) => {
            setIsLoading(false);
            setFlag((e) => !e);
            Toast.fire({
              icon: 'success',
              text: `نوبت ${setPageState ? 'بیمار' : 'شما'} با موفقیت حذف شد`,
            });
          })
          .catch((err) => {
            setIsLoading(false);
            Toast.fire({
              icon: 'success',
              text: err.response ? err.response.data : 'خطای شبکه',
            });
          });
      }
    });
  };
  return (
    <>
      <div className="flex flex-wrap items-center">
        <div className="w-1/6 flex justify-center">
          <div className="w-full lg:w-1/2 sm:w-3/4 border rounded-full cursor-pointer ">
            <img className="w-full h-full rounded-full" src={mainDomain + doctor?.avatar} alt="" />
          </div>
        </div>
        <div className="w-1/2 text-start pr-2">
          <p className="font-nastaligh lg:text-5xl sm:text-4xl text-3xl">
            {doctor?.firstName} {doctor?.lastName}
          </p>
          <p className="mt-5 font-semibold text-xs sm:text-lg">{doctor?.specialization}</p>
        </div>
        <div className="w-1/3 text-end pl-3 overflow-hidden">
          <Button
            sx={{
              py: 1,
              boxShadow: 'none',
              fontSize: 12,
              color: 'white',
              backgroundColor: 'rgb(248 113 113)',
              '&:hover': {
                backgroundColor: 'rgb(220 38 38)',
              },
            }}
            className="rounded-md duration-300 mt-2 whitespace-nowrap"
            onClick={deleteReservationHandler}
            variant="contained"
          >
            حذف نوبت
          </Button>
        </div>
      </div>
      <div className="px-10 mt-6">
        <div className="flex items-center text-xl mt-2">
          <p className="px-2">تاریخ:</p>
          <p className="px-2">{list.reservationTimeDateFA}</p>
        </div>
        <div className="flex items-center mt-5 text-xl">
          <p className="px-2">زمان:</p>
          <p className="px-2 whitespace-nowrap">
            {list.reservationTimeFromTime.slice(0,5)} الی {list.reservationTimeToTime.slice(0,5)}
          </p>
        </div>
      </div>
    </>
  );
}
