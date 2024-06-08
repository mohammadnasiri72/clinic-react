import { Box, Checkbox, Chip, FormControlLabel, IconButton, Menu, Tooltip } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineMessage } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Swal from 'sweetalert2';
import { FaEye } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import { mainDomain } from '../../utils/mainDomain';
import DetailsPatient from '../patientListStaff/DetailsPatient';
import MessageHandler from '../Reception/MessageHandler';
import CheckBoxReserve from './CheckBoxReserve';

export default function BoxReserveHistory({
  patientUserId,
  doctorId,
  fromPersianDate,
  toPersianDate,
  statusId,
  setIsLoading,
}) {
  const [listReserveHistory, setListReserveHistory] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showDetailsPatient, setShowDetailsPatient] = useState(false);
  const [patient, setPatient] = useState({});
  const [historyReception, setHistoryReception] = useState([]);
  const [patientId, setPatientId] = useState('');
  const [openBoxMessage, setOpenBoxMessage] = useState(false);
  const [userId, setUserId] = useState([]);
  const [listReserveChecked, setListReserveChecked] = useState([]);
  const [flag, setFlag] = useState(false);

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

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${mainDomain}/api/Reservation/GetList`, {
        params: {
          patientUserId,
          doctorId,
          fromPersianDate,
          toPersianDate,
          statusId: -1,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setListReserveHistory(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [fromPersianDate, toPersianDate, doctorId, patientUserId, flag]);

  useEffect(() => {
    if (patient.nationalId) {
      axios
        .get(`${mainDomain}/api/Appointment/GetList`, {
          params: {
            typeId: 1,
            patientNationalId: patient.nationalId,
            doctorMedicalSystemId: -1,
            statusId: -1,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setHistoryReception(res.data);
        })
        .catch((err) => {});
    }
  }, [patient]);

  useEffect(() => {
    if (patientId.length > 0) {
      axios
        .get(`${mainDomain}/api/Patient/GetList`, {
          params: {
            query: patientId,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setPatient(res.data[0]);
        })
        .catch((err) => {
          //   setIsLoading(false);
        });
    }
  }, [patientId]);

  useEffect(() => {
    if (showDetailsPatient) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [showDetailsPatient]);

  const sendMessageToAll = () => {
    setOpenBoxMessage(true);
    const arr = [];
    listReserveChecked.map((ev) => {
      arr.push(ev.patientUserId);
      return true;
    });
    setUserId(arr);
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
      <div className="flex justify-between shadow-sm mt-2 rounded-md px-1">
        <FormControlLabel
          control={
            <Checkbox
              size="large"
              indeterminate={
                listReserveChecked.length > 0 &&
                listReserveHistory.filter((ev) => (statusId >= 0 ? ev.statusId === statusId : ev)).length !==
                  listReserveChecked.length
              }
              checked={
                listReserveHistory.filter((ev) => (statusId >= 0 ? ev.statusId === statusId : ev)).length ===
                  listReserveChecked.length && listReserveHistory.length !== 0
              }
              onChange={() => {
                if (
                  listReserveChecked.length ===
                    listReserveHistory.filter((ev) => (statusId >= 0 ? ev.statusId === statusId : ev)).length &&
                  listReserveChecked.length !== 0
                ) {
                  setListReserveChecked([]);
                } else {
                  setListReserveChecked(
                    listReserveHistory.filter((ev) => (statusId >= 0 ? ev.statusId === statusId : ev))
                  );
                }
              }}
            />
          }
        />
        <Tooltip title="ارسال پیام" placement="right">
          <span>
            <IconButton disabled={listReserveChecked.length === 0} onClick={sendMessageToAll}>
              <AiOutlineMessage style={{ color: listReserveChecked.length === 0 ? 'inherit' : 'rgb(16 185 129)' }} />
            </IconButton>
          </span>
        </Tooltip>
      </div>
      <div className="flex flex-wrap">
        {listReserveHistory
          .filter((ev) => (statusId >= 0 ? ev.statusId === statusId : ev))
          .map((e, i) => (
            <div key={i} className="lg:w-1/4 md:w-1/3 sm:w-1/2 w-full p-2 relative">
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
                    {/* <span>نام و نام خانوادگی: </span> */}
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
                            console.log(e.statusId);
                          }}
                        >
                          <GiCancel className="text-red-500" />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </div>
                </Menu>
              </div>
            </div>
          ))}
      </div>
      <DetailsPatient
        showDetailsPatient={showDetailsPatient}
        setShowDetailsPatient={setShowDetailsPatient}
        patient={patient}
        historyReception={historyReception}
      />
      <MessageHandler open={openBoxMessage} setOpen={setOpenBoxMessage} userId={userId} setIsLoading={setIsLoading} />
      <Box
        sx={{ zIndex: '1300' }}
        onClick={() => setShowDetailsPatient(false)}
        style={{ display: showDetailsPatient ? 'block' : 'none' }}
        className="fixed top-0 bottom-0 left-0 right-0 bg-[#000c]"
      />
    </>
  );
}
