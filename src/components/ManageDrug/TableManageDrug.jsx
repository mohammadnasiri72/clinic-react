import {
  Chip,
  IconButton,
  Pagination,
  Paper,
  Stack,
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

export default function TableManageDrug({
  flag,
  setShowManageDrug,
  setDescDrug,
  drugForm,
  setValDrugForm,
  drugDose,
  setValDrugDose,
  drugUseCycle,
  setValDrugUseCycle,
  setNameDrug,
  setValCategoryDrug,
  setPriority,
  setisActive,
  setIsLoading,
  setFlag,
  setIsEdit,
  setEditId,
  setShowManageCategoryDrug,
  query,
  setNumPages,
  totalPages,
  drugList,
}) {
  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  const deleteDrugHandler = (e) => {
    Swal.fire({
      title: 'حذف دارو',
      text: 'آیا از حذف دارو مطمئن هستید؟',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'green',
      cancelButtonText: 'انصراف',
      confirmButtonText: 'حذف ',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const data = new FormData();
        data.append('medicationId', e.medicationId);
        axios
          .post(`${mainDomain}/api/Medication/Delete`, data, {
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
          <TableHead className="">
            <TableRow>
              <TableCell align="center">نام دارو</TableCell>
              <TableCell align="center">دسته بندی</TableCell>
              <TableCell align="center">وضعیت</TableCell>
              <TableCell align="center">اولویت</TableCell>
              <TableCell align="center">عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drugList
              // .filter((ev) => ev.medicalCategoryId === valCategoryDrug)
              .map((drug) => (
                <TableRow key={drug.medicationId}>
                  <TableCell align="center">
                    <div className="flex flex-col">
                      <span>{drug.name}</span>
                      <div className="flex justify-center">
                        {drug.defaultDosage && (
                          <div className="px-1">
                            <Chip className="mt-2" label={drug.defaultDosage} />
                          </div>
                        )}
                        {drug.defaultForm && (
                          <div className="px-1">
                            <Chip className="mt-2" label={drug.defaultForm} />
                          </div>
                        )}
                        {drug.defaultFrequency && (
                          <div className="px-1">
                            <Chip className="mt-2" label={drug.defaultFrequency} />
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="center">{drug.medicalCategoryTitle}</TableCell>

                  <TableCell align="center">
                    {drug.isActive && (
                      <div className="flex justify-center">
                        <GoCheckbox className="text-2xl text-green-500" />
                      </div>
                    )}
                    {!drug.isActive && (
                      <div className="flex justify-center">
                        <FaRegWindowClose className="text-2xl text-red-500" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell align="center">{drug.priority}</TableCell>
                  <TableCell align="center">
                    <div className="flex justify-around">
                      <Tooltip title="ویرایش" placement="bottom">
                        <IconButton
                          onClick={() => {
                            setShowManageDrug(true);
                            setDescDrug(drug.description);
                            setValDrugForm(drugForm.find((ev) => ev.name === drug.defaultForm));
                            setValDrugDose(drugDose.find((ev) => ev.name === drug.defaultDosage));
                            setValDrugUseCycle(drugUseCycle.find((ev) => ev.name === drug.defaultFrequency));
                            setNameDrug(drug.name);
                            setValCategoryDrug(drug.medicalCategoryId);
                            setPriority(drug.priority);
                            setisActive(drug.isActive);
                            setIsEdit(true);
                            setEditId(drug.medicationId);
                            setShowManageCategoryDrug(false);
                          }}
                        >
                          <Iconify icon={'eva:edit-fill'} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="حذف" placement="bottom">
                        <IconButton
                          onClick={() => {
                            deleteDrugHandler(drug);
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
      <div className="flex justify-center">
        <Stack spacing={2}>
          <Pagination
            onChange={(e, value) => {
              setNumPages(value);
            }}
            count={totalPages}
          />
        </Stack>
      </div>
    </>
  );
}
