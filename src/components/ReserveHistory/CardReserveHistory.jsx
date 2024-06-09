import React, { useState } from 'react';
import { Box, Chip, IconButton, Menu, Tooltip } from '@mui/material';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaEye } from 'react-icons/fa';
import { AiOutlineMessage } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { GiCancel } from 'react-icons/gi';
import axios from 'axios';
import { mainDomain } from '../../utils/mainDomain';
import CheckBoxReserve from './CheckBoxReserve';

export default function CardReserveHistory({
  listReserveChecked,
  setListReserveChecked,
  e,
  listReserveHistory,
  statusId,
  setShowDetailsPatient,
  setPatientId,
  setOpenBoxMessage,
  setUserId,
  setIsLoading,
  setFlag,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const cancelHandler = (e) => {
    Swal.fire({
      title: 'کنسل کردن نوبت',
      text: 'آیا از ثبت درخواست خود مطمئن هستید؟',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'green',
      cancelButtonText: 'انصراف',
      confirmButtonText: 'کنسل',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const data = {
          reservationId: e.reservationId,
          statusId: 0,
        };
        axios
          .post(`${mainDomain}/api/Reservation/Update`, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((res) => {
            setIsLoading(false);
            setFlag((e) => !e);
            Toast.fire({
              icon: 'success',
              text: 'نوبت با موفقیت کنسل شد',
            });
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
      <div className=" border rounded-lg p-2 relative">
        <CheckBoxReserve
          listReserveChecked={listReserveChecked}
          setListReserveChecked={setListReserveChecked}
          e={e}
          listReserveHistory={listReserveHistory}
          statusId={statusId}
        />
        <div className="text-start pr-5">
          <div className="mt-1">
            <span className="font-semibold pr-2">
              {e.patientFirstName} {e.patientLastName}
            </span>
          </div>
          <div className="mt-1">
            <span>تاریخ: </span>
            <span>{e.reservationTimeDateFA}</span>
          </div>
          <div className="mt-1">
            <span>زمان: </span>
            <span>
              {e.reservationTimeToTime.slice(0, 5)} - {e.reservationTimeFromTime.slice(0, 5)}
            </span>
          </div>
          <div className="mt-1">
            <Chip
              size="small"
              label={e.status}
              variant="filled"
              // eslint-disable-next-line no-nested-ternary
              color={e.statusId === 0 ? 'error' : e.statusId === 1 ? 'primary' : 'success'}
            />
          </div>
        </div>
      </div>
      <div className="absolute left-4 top-5">
        <Box
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <BsThreeDotsVertical className="cursor-pointer text-teal-500" />
        </Box>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <div className="px-4">
            <Tooltip title="مشاهده جزئیات" placement="right">
              <span>
                <IconButton
                  onClick={() => {
                    handleClose();
                    setShowDetailsPatient(true);
                    setPatientId(e.patientNationalId);
                  }}
                >
                  <FaEye className="text-teal-500" />
                </IconButton>
              </span>
            </Tooltip>
          </div>
          <div className="px-4">
            <Tooltip title="ارسال پیام" placement="right">
              <span>
                <IconButton
                  onClick={() => {
                    handleClose();
                    setOpenBoxMessage(true);
                    setUserId([e.patientUserId]);
                  }}
                >
                  <AiOutlineMessage className="text-emerald-500" />
                </IconButton>
              </span>
            </Tooltip>
          </div>
          <div className="px-4">
            <Tooltip title="کنسل" placement="right">
              <span>
                <IconButton
                  onClick={() => {
                    cancelHandler(e);
                    handleClose();
                  }}
                >
                  <GiCancel className="text-red-500" />
                </IconButton>
              </span>
            </Tooltip>
          </div>
        </Menu>
      </div>
    </>
  );
}
