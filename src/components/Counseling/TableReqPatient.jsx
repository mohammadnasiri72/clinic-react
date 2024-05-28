import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FaTrashAlt } from 'react-icons/fa';
import { BsCloudUploadFill } from 'react-icons/bs';
import { IconButton, Tooltip } from '@mui/material';
import Swal from 'sweetalert2';
import { MdDoneOutline } from "react-icons/md";
import axios from 'axios';
import { useState } from 'react';
import SimpleBackdrop from '../backdrop';
import { mainDomain } from '../../utils/mainDomain';

export default function TableReqPatient({
  reqPatient,
  setApointmentId,
  setPageNumber,
  setFlagUpload,
  apointmentId,
  flagUpload,
}) {
  const [isLoading, setIsLoading] = useState(false);
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
                <TableCell align="center">{req.paid? <MdDoneOutline className='text-green-500'/> : <div className='flex items-center justify-center'> <button className='bg-green-500 px-4 py-2 rounded-md duration-300 hover:bg-green-600 text-white'>پرداخت</button></div>}</TableCell>
                <TableCell align="center">
                  <div className="flex items-center justify-around">
                    <Tooltip title="آپلود فایل جدید">
                      <IconButton onClick={() => goToUploadPage(req)}>
                        <BsCloudUploadFill className="text-xl cursor-pointer" />
                      </IconButton>
                    </Tooltip>
                    {!req.paid &&
                      <Tooltip title="حذف">
                      <IconButton onClick={() => deleteUploadHandler(req)}>
                        <FaTrashAlt className="text-lg cursor-pointer" />
                      </IconButton>
                    </Tooltip>}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isLoading && <SimpleBackdrop />}
    </>
  );
}
