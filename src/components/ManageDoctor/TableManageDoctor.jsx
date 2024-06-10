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

export default function TableManageDoctor({
  flag,
  setIsLoading,
  setFlag,
  setShowManageDoctor,
  setIsEdit,
  setMedicalSystemId,
  setFirstNameDoctor,
  setLastNameDoctor,
  setMobileDoctor,
  setEmailDoctor,
  setExpertiseDoctor,
}) {
  const [listDoctor, setListDoctor] = useState([]);

  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  // get list doctor
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${mainDomain}/api/Doctor/GetList`, {
        params: {
          specializationId: -1,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setListDoctor(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [flag]);

  //   delete doctor
  const deleteDoctorHandler = (doctor) => {
    Swal.fire({
      title: 'حذف پزشک',
      text: 'آیا از حذف پزشک مطمئن هستید؟',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'green',
      cancelButtonText: 'انصراف',
      confirmButtonText: 'حذف ',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const data = new FormData();
        data.append('doctorId', doctor.doctorId);
        axios
          .post(`${mainDomain}/api/Doctor/Delete`, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((res) => {
            Toast.fire({
              icon: 'success',
              text: 'پزشک با موفقیت حذف شد',
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

  // edit doctor
  const editDoctorHandler = (doctor) => {
    setShowManageDoctor(true);
    setIsEdit(true);
    setMedicalSystemId(doctor.medicalSystemId);
    setFirstNameDoctor(doctor.firstName)
    setLastNameDoctor(doctor.lastName)
    setMobileDoctor(doctor.userPhoneNumber? doctor.userPhoneNumber : '')
    setEmailDoctor(doctor.userEmail? doctor.userEmail : '')
    setExpertiseDoctor(doctor.specializationId)
  };

  return (
    <>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>ردیف</TableCell>
                <TableCell align="center">نام و نام خانوادگی</TableCell>
                <TableCell align="center">کد نظام پزشکی</TableCell>
                <TableCell align="center">موبایل</TableCell>
                <TableCell align="center">ایمیل</TableCell>
                <TableCell align="center">تخصص</TableCell>
                <TableCell align="center">عملیات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listDoctor.map((doctor, i) => (
                <TableRow key={doctor.doctorId}>
                  <TableCell>
                    <span className="pr-2 font-semibold">{i + 1}</span>
                  </TableCell>
                  <TableCell align="center">
                    {doctor.firstName} {doctor.lastName}
                  </TableCell>
                  <TableCell align="center">{doctor.medicalSystemId}</TableCell>
                  <TableCell align="center">{doctor.userPhoneNumber}</TableCell>
                  <TableCell align="center">{doctor.userEmail}</TableCell>
                  <TableCell align="center">{doctor.specialization}</TableCell>
                  <TableCell align="center">
                    <div className="flex justify-around">
                      <Tooltip title="ویرایش" placement="bottom">
                        <IconButton
                          onClick={() => {
                            editDoctorHandler(doctor);
                          }}
                        >
                          <Iconify icon={'eva:edit-fill'} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="حذف" placement="bottom">
                        <IconButton
                          onClick={() => {
                            deleteDoctorHandler(doctor);
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
      </div>
    </>
  );
}
