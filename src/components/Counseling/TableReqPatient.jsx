import { Button, IconButton, Skeleton, TextField, Tooltip } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { useState } from 'react';
import { BsCloudUploadFill } from 'react-icons/bs';
import { FaEye, FaTrashAlt } from 'react-icons/fa';
import { PiUserList } from 'react-icons/pi';
import { FaRegTrashCan } from 'react-icons/fa6';
import { GiNotebook } from 'react-icons/gi';
import { MdDoneOutline, MdOutlineSupportAgent } from 'react-icons/md';
import { TbBrandCashapp } from 'react-icons/tb';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';
import DetailsRequest from './DetailsRequest';

export default function TableReqPatient({
  reqPatient,
  setApointmentId,
  setPageNumber,
  setFlagUpload,
  apointmentId,
  flagUpload,
  setIsLoading,
  setIsShowDetails,
  setAppointmentId,
  setReceptionSelected,
}) {
  console.log(reqPatient);
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });
  const goToUploadPage = (req) => {
    setApointmentId(req.appointmentId);
    setPageNumber(4);
    setFlagUpload((e) => !e);
  };
  const deleteUploadHandler = (req) => {
    Swal.fire({
      title: 'حذف درخواست',
      text: 'آیا از حذف درخواست خود مطمئن هستید؟',

      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'green',
      cancelButtonText: 'انصراف',
      confirmButtonText: 'حذف ',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const dataDeleteFile = new FormData();
        dataDeleteFile.append('appointmentId', req.appointmentId);
        axios
          .post(`${mainDomain}/api/AppointmentCounseling/Delete`, dataDeleteFile, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((res) => {
            Toast.fire({
              icon: 'success',
              text: 'درخواست با موفقیت حذف شد',
            });
            setIsLoading(false);
            setFlagUpload(!flagUpload);
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
      <div>
        <div className="md:block hidden">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ردیف</TableCell>
                  <TableCell>نام دکتر</TableCell>
                  <TableCell align="center">وضعیت</TableCell>
                  <TableCell align="center">پرداخت</TableCell>
                  <TableCell align="center">عملیات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reqPatient.map((req, index) => (
                  <TableRow key={req.appointmentId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>
                      <span className="pr-2 font-semibold">{index + 1}</span>
                    </TableCell>
                    <TableCell component="th" scope="req">
                      {req.doctorFirstName}
                      {req.doctorLastName}
                    </TableCell>
                    <TableCell align="center">{req.status}</TableCell>
                    <TableCell align="center">
                      {req.paid ? (
                        <MdDoneOutline className="text-green-500" />
                      ) : (
                        <div className="flex items-center justify-center">
                          {' '}
                          <Button
                            sx={{
                              boxShadow: 'none',
                              backgroundColor: 'rgb(16 185 129)',
                              '&:hover': {
                                backgroundColor: 'rgb(5 150 105)',
                              },
                            }}
                            className="duration-300 text-white"
                          >
                            پرداخت
                          </Button>
                        </div>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <div className="flex items-center justify-around">
                        <Tooltip title="آپلود فایل جدید">
                          <IconButton onClick={() => goToUploadPage(req)}>
                            <BsCloudUploadFill className="text-xl cursor-pointer" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="مشاهده جزئیات درخواست">
                          <IconButton
                            onClick={() => {
                              setIsShowDetails(true);
                              setAppointmentId(req.appointmentId);
                              setReceptionSelected(req);
                            }}
                          >
                            <FaEye className="text-xl cursor-pointer" />
                          </IconButton>
                        </Tooltip>
                        {!req.paid && (
                          <Tooltip title="حذف">
                            <IconButton onClick={() => deleteUploadHandler(req)}>
                              <FaTrashAlt className="text-lg cursor-pointer" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="md:hidden block">
          <div className="flex flex-wrap justify-around pb-2">
            {reqPatient.map((req) => (
              <div key={req.appointmentId} className="border rounded-2xl bg-slate-50 p-3 w-full mt-2">
                <div className="flex justify-between">
                  <div className="flex w-2/3 items-center">
                    <div className='rounded-full border w-14 h-14 flex justify-center items-center'>
                    <MdOutlineSupportAgent className='text-5xl text-slate-700'/>
                      {/* <img className="w-14 h-14 border rounded-full p-1" src="/images/nobat.png" alt="" /> */}
                    </div>
                    <div className="flex flex-col px-1">
                      <span className="font-semibold whitespace-nowrap">{`${req.doctorFirstName} ${req.doctorLastName}`}</span>
                      <span className="text-[#42181899] flex items-center">
                        <GiNotebook className='text-3xl px-1'/>
                        <span className='px-1'>{req.status}</span>
                      </span>
                    </div>
                  </div>
                  <div className='w-1/3'>
                  <div>
                    <Button
                    variant="contained"
                    sx={{
                      py: 1,
                      boxShadow: 'none',
                      backgroundColor: 'rgb(16 185 129)',
                      '&:hover': {
                        backgroundColor: 'rgb(5 150 105)',
                      },
                    }}
                      
                      // onClick={() => editPatientHandler(pat)}
                      className="flex items-center border"
                    >
                      <TbBrandCashapp className="text-white text-xl" />
                      <span className="text-white">پرداخت</span>
                    </Button>
                  </div>
                  </div>
                </div>
                <div className='sm:w-1/2 w-full flex justify-around flex-wrap mt-3'>
                
                  <div className="w-1/3">
                    <Button size="small" onClick={() => goToUploadPage(req)} className="flex items-center">
                      <BsCloudUploadFill className="text-teal-500 text-xl sm:translate-x-2" />
                      <span className="text-teal-500 whitespace-nowrap sm:translate-x-2 px-1">آپلود فایل </span>
                    </Button>
                  </div>
                  <div className="w-1/3">
                    <Button
                      size="small"
                      onClick={() => {
                        setIsShowDetails(true);
                        setAppointmentId(req.appointmentId);
                      }}
                      className="flex items-center"
                    >
                      <FaEye className="text-slate-700 text-xl" />
                      <span className="text-slate-700 whitespace-nowrap px-1"> جزئیات</span>
                    </Button>
                  </div>
                  <div className="w-1/3">
                    <Button size="small" onClick={() => deleteUploadHandler(req)} className="flex items-center">
                      <FaRegTrashCan className="text-red-500 text-lg" />
                      <span className="text-red-500 px-1">حذف</span>
                    </Button>
                  </div>
                </div>
                {/* <div className="mt-3 w-52 mx-auto">
                  <TextField
                    aria-readonly
                    className=" text-end"
                    id="outlined-multiline-flexible"
                    label="نام دکتر"
                    dir="rtl"
                    value={`${req.doctorFirstName} ${req.doctorLastName}`}
                  />
                </div> */}
                {/* <div className="mt-3 w-52 mx-auto">
                  <TextField
                    aria-readonly
                    className="text-end"
                    id="outlined-multiline-flexible"
                    label="وضعیت"
                    dir="rtl"
                    value={req.status}
                  />
                </div> */}
                {/* <div className="mt-3 w-52 mx-auto">
                <TextField
                  aria-readonly
                  className="text-end"
                  id="outlined-multiline-flexible"
                  label="پرداخت"
                  dir="rtl"
                  value={req.paid? <MdDoneOutline className='text-green-500'/> : <div className='flex items-center justify-center'> <button className='bg-green-500 px-4 py-2 rounded-md duration-300 hover:bg-green-600 text-white'>پرداخت</button></div>}
                />
              </div> */}

                {/* <div className="flex flex-wrap justify-center mt-5">
                  <div className="w-1/2">
                    <Button size="small" onClick={() => deleteUploadHandler(req)} className="flex items-center">
                      <FaRegTrashCan className="text-red-500 text-lg" />
                      <span className="text-red-500">حذف</span>
                    </Button>
                  </div>
                  <div className="w-1/2">
                    <Button size="small" onClick={() => goToUploadPage(req)} className="flex items-center">
                      <BsCloudUploadFill className="text-teal-500 text-xl sm:translate-x-2" />
                      <span className="text-teal-500 whitespace-nowrap sm:translate-x-2">آپلود فایل </span>
                    </Button>
                  </div>
                  <div className="w-1/2">
                    <Button
                      size="small"
                      // onClick={() => editPatientHandler(pat)}
                      className="flex items-center"
                    >
                      <TbBrandCashapp className="text-green-500 text-xl" />
                      <span className="text-green-500">پرداخت</span>
                    </Button>
                  </div>
                  <div className="w-1/2">
                    <Button
                      size="small"
                      onClick={() => {
                        setIsShowDetails(true);
                        setAppointmentId(req.appointmentId);
                      }}
                      className="flex items-center"
                    >
                      <FaEye className="text-slate-700 text-xl" />
                      <span className="text-slate-700">مشاهده جزئیات </span>
                    </Button>
                  </div>
                </div> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
