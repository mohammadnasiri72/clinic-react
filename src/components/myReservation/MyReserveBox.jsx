import { Button } from '@mui/material';
import axios from 'axios';
import { IoCalendarOutline } from 'react-icons/io5';
import { MdOutlineAccessTime } from 'react-icons/md';
import Swal from 'sweetalert2';
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
        <div className="w-1/4 flex justify-center p-2">
          <div className="w-full lg:w-1/2 sm:w-3/4 border rounded-full cursor-pointer ">
            <img className="w-full h-full rounded-full" src={mainDomain + doctor?.avatar} alt="" />
          </div>
        </div>
        <div className="w-3/4 text-start pr-2">
          <p className="lg:text-2xl text-xl font-semibold whitespace-nowrap">
            {doctor?.firstName} {doctor?.lastName}
          </p>
          <p className="mt-5 font-semibold text-sm text-[#0007] sm:text-lg">{doctor?.specialization}</p>
        </div>
        
      </div>
      <div className="px-5 mt-2">
        <div className="flex items-center">
          <IoCalendarOutline className='text-[#777] text-2xl'/>
          <p className="px-2 text-lg font-semibold">{list.reservationTimeDateFA}</p>
        </div>
        <div className="flex items-center text-xl mt-2">
        <MdOutlineAccessTime className='text-[#777] text-2xl'/>
          <p className="px-2 whitespace-nowrap text-lg font-semibold">
            {list.reservationTimeFromTime.slice(0,5)} الی {list.reservationTimeToTime.slice(0,5)}
          </p>
        </div>
      </div>
      <div className="text-start overflow-hidden mt-2 px-5">
          <Button
          size='small'
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
    </>
  );
}
