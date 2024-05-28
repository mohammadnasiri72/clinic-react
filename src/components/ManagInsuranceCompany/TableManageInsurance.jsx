import {
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
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';
import Iconify from '../Iconify';
import ModalEditInsurance from './ModalEditInsurance';

export default function TableManageInsurance({ flag, setIsLoading, setFlag }) {
  const [listInsurance, setListInsurance] = useState([]);

  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  // get list insurance
  useEffect(() => {
    axios
      .get(`${mainDomain}/api/InsuranceCompany/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setListInsurance(res.data);
      })
      .catch((err) => {});
  }, [flag]);

  // delete insurance
  const deleteInsuranceHandler = (insurance) => {
    console.log(insurance);
    Swal.fire({
      title: 'حذف بیمه',
      text: 'آیا ازحذف بیمه مطمئن هستید؟',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'green',
      cancelButtonText: 'انصراف',
      confirmButtonText: 'حذف ',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const data = new FormData();
        data.append('insuranceCompanyId', insurance.insuranceCompanyId);
        axios
          .post(`${mainDomain}/api/InsuranceCompany/Delete`, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((res) => {
            Toast.fire({
              icon: 'success',
              text: 'بیمه با موفقیت حذف شد',
            });
            setFlag((e) => !e);
            setIsLoading(false);
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
        <Table sx={{ minWidth: 650 }} aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>ردیف</TableCell>
              <TableCell align="center">عنوان</TableCell>
              <TableCell align="center">توضیحات</TableCell>
              <TableCell align="center">وضعیت</TableCell>
              <TableCell align="center">عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listInsurance.map((insurance, i) => (
              <TableRow key={insurance.insuranceCompanyId}>
                <TableCell>
                  <span className="pr-2 font-semibold">{i + 1}</span>
                </TableCell>
                <TableCell align="center">{insurance.name}</TableCell>
                <TableCell align="center">{insurance.description}</TableCell>
                <TableCell align="center">{insurance.isActive ? 'فعال' : 'غیر فعال'}</TableCell>

                <TableCell align="center">
                  <div className="flex justify-around">
                    <ModalEditInsurance insurance={insurance} setIsLoading={setIsLoading} setFlag={setFlag} />

                    <Tooltip title="حذف" placement="bottom">
                      <IconButton
                        onClick={() => {
                          deleteInsuranceHandler(insurance);
                        }}
                      >
                        <Iconify className="text-red-500" icon={'eva:trash-2-outline'} />
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
