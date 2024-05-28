import {
  Button,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { FaDownload, FaTrashAlt } from 'react-icons/fa';
import { mainDomain } from '../../utils/mainDomain';

export default function TableOrder({ patSelected, setIsLoading, flag, setFlag , setIsOpenOrder , setOrderEdit}) {
  const [listOrderSelected, setListOrderSelected] = useState([]);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  //   get list order selected
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${mainDomain}/api/MedicalRecord/Order/GetList`, {
        params: {
          appointmentId: patSelected.appointmentId,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setListOrderSelected(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [flag ]);

  //   delete order handler
  const deleteOrderHandler = (e) => {
    Swal.fire({
      title: 'حذف آیتم',
      text: 'آیا از حذف درخواست خود مطمئن هستید؟',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'green',
      cancelButtonText: 'انصراف',
      confirmButtonText: 'حذف ',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const dataDelete = new FormData();
        dataDelete.append('orderId', e.orderId);
        axios
          .post(`${mainDomain}/api/MedicalRecord/Order/Delete`, dataDelete, {
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
            setFlag((e) => !e);
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
        {listOrderSelected.length > 0 && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="sticky table">
              <TableHead className="">
                <TableRow>
                  <TableCell align="center">وضعیت</TableCell>
                  <TableCell align="center">نام اردر</TableCell>
                  <TableCell align="center">توضیحات پزشک</TableCell>
                  <TableCell align="center">دانلود</TableCell>
                  <TableCell align="center">عملیات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listOrderSelected.map((e) => (
                  <TableRow key={e.orderId}>
                    <TableCell align="center">
                    <Chip 
                    // color={e.statusId===1?'warning':e.statusId===2?'primary':e.statusId===3?'success':'error'}
                     label={<span className='text-xs'>{e.status}</span>} />
                        </TableCell>
                    <TableCell align="center">{e.medicalItemName}</TableCell>
                    <TableCell align="center">{e.doctorComments}</TableCell>
                    <TableCell align="center">
                        <div className='flex justify-center'>
                        <a target='_blank' rel="noreferrer" href={mainDomain} download ><FaDownload /></a>
                        </div>
                    </TableCell>
                    <TableCell align="center">
                      <div className="flex justify-around">
                        <Button
                          onClick={() => {
                            setIsOpenOrder(true)
                            setOrderEdit(e);
                          }}
                          variant="contained"
                          color="primary"
                          className="text-white px-0"
                        >
                          پاسخ
                        </Button>
                        <Tooltip title="حذف">
                          <IconButton onClick={() => deleteOrderHandler(e)} className="w-10 h-10">
                            <FaTrashAlt className="text-lg text-red-500" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {listOrderSelected.length === 0 && <p>موردی موجود نیست</p>}
      </div>
      
      
      
    </>
  );
}
