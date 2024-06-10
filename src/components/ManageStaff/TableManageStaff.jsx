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
import Swal from 'sweetalert2';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';
import Iconify from '../Iconify';

export default function TableManageStaff({
  setIsLoading,
  setFlag,
  flag,
  setShowManageStaff,
  setIsEdit,
  setNationalIdStaff,
  setFirstNameStaff,
  setLastNameStaff,
  setGenderStaff,
  setMobileStaff,
  setJobStaff,
  setStaffId
}) {
  const [listStaff, setListStaff] = useState([]);

  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  // get list staff
  useEffect(() => {
    setIsLoading(true)
    axios
      .get(`${mainDomain}/api/Staff/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false)
        setListStaff(res.data);
      })
      .catch((err) => {
        setIsLoading(false)
      });
  }, [flag]);

  //   delete staff
  const deleteStaffHandler = (staff) => {
    Swal.fire({
      title: 'حذف پرسنل',
      text: 'آیا از حذف پرسنل مطمئن هستید؟',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'green',
      cancelButtonText: 'انصراف',
      confirmButtonText: 'حذف ',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const data = new FormData();
        data.append('staffId', staff.staffId);
        axios
          .post(`${mainDomain}/api/Staff/Delete`, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((res) => {
            Toast.fire({
              icon: 'success',
              text: 'پرسنل با موفقیت حذف شد',
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

  // edit staff
  const editStaffHandler = (staff) => {
    setShowManageStaff(true);
    setIsEdit(true);
    setNationalIdStaff(staff.nationalId)
    setFirstNameStaff(staff.firstName)
    setLastNameStaff(staff.lastName)
    setGenderStaff(staff.gender)
    setMobileStaff(staff.userPhoneNumber)
    setJobStaff(staff.jobTitle)
    setStaffId(staff.staffId)
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
                <TableCell align="center">کد ملی</TableCell>
                <TableCell align="center">موبایل</TableCell>
                <TableCell align="center">جنسیت</TableCell>
                <TableCell align="center">عنوان شغلی</TableCell>
                <TableCell align="center">عملیات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listStaff.map((staff, i) => (
                <TableRow key={staff.staffId}>
                  <TableCell>
                    <span className="pr-2 font-semibold">{i + 1}</span>
                  </TableCell>
                  <TableCell align="center">
                    {staff.firstName} {staff.lastName}
                  </TableCell>
                  <TableCell align="center">{staff.nationalId}</TableCell>
                  <TableCell align="center">{staff.userPhoneNumber}</TableCell>
                  <TableCell align="center">{staff.gender === 'm' ? 'مرد' : 'زن'}</TableCell>
                  <TableCell align="center">{staff.jobTitle}</TableCell>

                  <TableCell align="center">
                    <div className="flex justify-around">
                      <Tooltip title="ویرایش" placement="bottom">
                        <IconButton
                          onClick={() => {
                            editStaffHandler(staff);
                            //   setShowManageServices(true);
                            //   setValCategoryServices(service.medicalCategoryId);
                            //   setNameServices(service.title);
                            //   setPrice(service.rate);
                            //   setPriority(service.priority);
                            //   setDescService(service.description);
                            //   setIsEdit(true);
                            //   setisActive(service.isActive);
                            //   setEditId(service.medicalServiceId);
                          }}
                        >
                          <Iconify icon={'eva:edit-fill'} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="حذف" placement="bottom">
                        <IconButton
                          onClick={() => {
                            deleteStaffHandler(staff);
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
