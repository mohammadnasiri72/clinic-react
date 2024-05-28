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
import { useEffect, useState } from 'react';
import { FaRegWindowClose } from 'react-icons/fa';
import { GoCheckbox } from 'react-icons/go';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';
import Iconify from '../Iconify';

export default function TableManageService({
  flag,
  categoryServices,
  setFlag,
  setIsLoading,
  setShowManageServices,
  setValCategoryServices,
  setNameServices,
  setPrice,
  setPriority,
  setDescService,
  setIsEdit,
  setisActive,
  setEditId,
  setShowManagecategoryServices
}) {
  const [serviceList, setServiceList] = useState([]);
// console.log(serviceList);
//   console.log(categoryServices);
  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  // get list services
  useEffect(() => {
      axios
        .get(`${mainDomain}/api/MedicalService/GetList`, {
          params: {
            categoryId: -1,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setServiceList(res.data);
        })
        .catch((err) => {});
    
  }, [flag]);

  //   delete service
  const deleteDrugHandler = (e) => {
    Swal.fire({
      title: 'حذف خدمت',
      text: 'آیا از حذف خدمت مطمئن هستید؟',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'green',
      cancelButtonText: 'انصراف',
      confirmButtonText: 'حذف ',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const data = new FormData();
        data.append('medicalServiceId', e.medicalServiceId);
        axios
          .post(`${mainDomain}/api/MedicalService/Delete`, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((res) => {
            setFlag((e) => !e);
            setIsLoading(false);
            Toast.fire({
              icon: 'success',
              text: 'حذف با موفقیت انجام شد',
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">نام خدمت</TableCell>
              <TableCell align="center">توضیحات</TableCell>
              <TableCell align="center">تعرفه</TableCell>
              <TableCell align="center">وضعیت</TableCell>
              <TableCell align="center">اولویت</TableCell>
              <TableCell align="center">عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {serviceList.map((service) => (
              <TableRow key={service.medicalServiceId}>
                <TableCell align="center">
                  {categoryServices.find((ev) => ev.medicalServiceCategoryId === service.medicalCategoryId)?.title} /{' '}
                  {service.title}
                </TableCell>
                <TableCell align="center">{service.description}</TableCell>
                <TableCell align="center">{service.rate}</TableCell>

                <TableCell align="center">
                  {service.isActive && (
                    <div className="flex justify-center">
                      <GoCheckbox className="text-2xl text-green-500" />
                    </div>
                  )}
                  {!service.isActive && (
                    <div className="flex justify-center">
                      <FaRegWindowClose className="text-2xl text-red-500" />
                    </div>
                  )}
                </TableCell>
                <TableCell align="center">{service.priority}</TableCell>
                <TableCell align="center">
                  <div className="flex justify-around">
                    <Tooltip title="ویرایش" placement="bottom">
                      <IconButton
                        onClick={() => {
                          setShowManageServices(true);
                          setValCategoryServices(service.medicalCategoryId);
                          setNameServices(service.title);
                          setPrice(service.rate);
                          setPriority(service.priority);
                          setDescService(service.description);
                          setIsEdit(true);
                          setisActive(service.isActive);
                          setEditId(service.medicalServiceId);
                          setShowManagecategoryServices(false)
                        }}
                      >
                        <Iconify icon={'eva:edit-fill'} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="حذف" placement="bottom">
                      <IconButton
                        onClick={() => {
                          deleteDrugHandler(service);
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
