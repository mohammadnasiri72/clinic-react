import { Button } from '@mui/material';
import axios from 'axios';
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
      <div className="flex items-center">
        <div className="w-1/6 p-3">
          <div className="w-20 h-20 border rounded-full cursor-pointer">
            <img className="w-full h-full rounded-full" src={mainDomain + doctor?.avatar} alt="" />
          </div>
        </div>
        <div className="w-2/3 text-start">
          <p className="font-nastaligh text-5xl">
            {doctor?.firstName} {doctor?.lastName}
          </p>
          <p className="mt-5 font-semibold">{doctor?.specialization}</p>
        </div>
        <div className="w-1/6">
          <Button
            sx={{
              py: 1,
              boxShadow: 'none',
              // fontSize: 20,
              backgroundColor: 'rgb(248 113 113)',
              '&:hover': {
                backgroundColor: 'rgb(220 38 38)',
              },
            }}
            className="p-2 rounded-md duration-300 mt-2 w-28"
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
          <p className="px-2">
            {list.reservationTimeFromTime} الی {list.reservationTimeToTime}
          </p>
        </div>
      </div>
    </>
  );
}
