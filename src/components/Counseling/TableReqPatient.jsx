import { Button, IconButton, Tooltip } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { BsCloudUploadFill } from 'react-icons/bs';
import { FaEye, FaTrashAlt } from 'react-icons/fa';
import { FaRegTrashCan } from 'react-icons/fa6';
import { GiNotebook } from 'react-icons/gi';
import { IoMdTime } from 'react-icons/io';
import { IoCalendarOutline } from 'react-icons/io5';
import { MdDoneOutline, MdOutlineSupportAgent } from 'react-icons/md';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';

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
                  <TableCell><span className='pr-3'>نام دکتر</span></TableCell>
                  <TableCell align="center">تاریخ و زمان درخواست</TableCell>
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
                    <TableCell align="center">{req.startTime.slice(0,5)} , {req.appointmentDateFA}</TableCell>
                    <TableCell align="center">{req.status}</TableCell>
                    <TableCell align="center">
                      {req.paid ? (
                        <div className="flex justify-center">
                          <MdDoneOutline className="text-green-500 text-2xl" />
                        </div>
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
                        <Tooltip title="ارسال فایل جدید">
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
                  <div className="flex w-4/5 items-center">
                    <div className="flex justify-center items-center">
                      <MdOutlineSupportAgent className="text-4xl text-slate-700 w-12 h-12 border rounded-full" />
                      {/* <img className="w-14 h-14 border rounded-full p-1" src="/images/nobat.png" alt="" /> */}
                    </div>
                    <div className="flex flex-col px-1">
                      <span className="font-semibold whitespace-nowrap text-sm">{`${req.doctorFirstName} ${req.doctorLastName}`}</span>
                      <div className="text-[#42181899] flex items-center">
                        <GiNotebook className="text-3xl px-1" />
                        <span className="px-1 text-xs">{req.status}</span>
                        <span className="text-xs whitespace-nowrap">{req.paid ? '' : '(در انتظار پرداخت)'}</span>
                      </div>
                      <div className='flex items-center'>
                      <IoCalendarOutline className='text-xl'/>
                        <span className='text-sm px-1'>{req.appointmentDateFA}</span>
                      </div>
                      <div className='flex items-center'>
                      <IoMdTime className='text-xl'/>
                        <span className='text-sm px-1'>{req.startTime.slice(0,5)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/5">
                    {!req.paid && (
                      <div>
                        <Button
                          variant="contained"
                          size="small"
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
                          <span className="text-white">پرداخت</span>
                        </Button>
                      </div>
                    )}
                    {req.paid && <p className='whitespace-nowrap text-xs text-green-500 font-semibold'>پرداخت شده</p>}
                  </div>
                </div>
                <div className="sm:w-1/2 w-full flex justify-around flex-wrap mt-3">
                  <div className="w-1/3">
                    <Button size="small" onClick={() => goToUploadPage(req)} className="flex items-center">
                      <BsCloudUploadFill className="text-teal-500 text-xl sm:translate-x-2" />
                      <span className="text-teal-500 whitespace-nowrap sm:translate-x-2 px-1">ارسال فایل </span>
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
                  {!req.paid && (
                    <div className="w-1/3">
                      <Button size="small" onClick={() => deleteUploadHandler(req)} className="flex items-center">
                        <FaRegTrashCan className="text-red-500 text-lg" />
                        <span className="text-red-500 px-1">حذف</span>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
