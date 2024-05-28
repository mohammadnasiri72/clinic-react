import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react'
import { mainDomain } from '../../utils/mainDomain';
import Iconify from '../Iconify';
import ModalEditType from './ModalEditType';

export default function TableManageInfo({valTypeList , valTypeCategoryList , setIsLoading , flag , setFlag}) {
  const [listItem , setListItem] = useState([])


  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  // get list item
  useEffect(()=>{
    if (valTypeList) {
      setIsLoading(true)
      axios
      .get(`${mainDomain}/api/BasicInfo/Item/GetList`, {
        params: {
          typeId: valTypeList,
          categoryId: valTypeCategoryList
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setListItem(res.data);
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
      });
    }
   
  },[valTypeList , valTypeCategoryList , flag ])


  // delete type
  const deleteTypeHandler = (item)=>{
    Swal.fire({
      title: 'حذف آیتم',
      text: 'آیا از حذف آیتم مطمئن هستید؟',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'green',
      cancelButtonText: 'انصراف',
      confirmButtonText: 'حذف ',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const data = new FormData();
        data.append('itemId', item.itemId);
        axios
          .post(`${mainDomain}/api/BasicInfo/Item/Delete`, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((res) => {
            Toast.fire({
              icon: 'success',
              text: 'آیتم با موفقیت حذف شد',
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
  }


  return (
   <>
    <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>ردیف</TableCell>
                <TableCell align="center">عنوان دسته بندی</TableCell>
                <TableCell align="center">عنوان</TableCell>
                <TableCell align="center">توضیحات</TableCell>
                <TableCell align="center">وضعیت</TableCell>
                <TableCell align="center">اولویت</TableCell>
                <TableCell align="center">عملیات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listItem.map((item, i) => (
                <TableRow key={item.itemId}>
                  <TableCell>
                    <span className="pr-2 font-semibold">{i + 1}</span>
                  </TableCell>
                  <TableCell align="center">
                    {item.medicalCategoryTitle} 
                  </TableCell>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">{item.description}</TableCell>
                  <TableCell align="center">{item.isActive? 'فعال' : 'غیر فعال'}</TableCell>
                  <TableCell align="center">{item.priority}</TableCell>
                  <TableCell align="center">
                    <div className="flex justify-around">
                      <ModalEditType setIsLoading={setIsLoading} setFlag={setFlag} item={item}/>
                      <Tooltip title="حذف" placement="bottom">
                        <IconButton
                          onClick={() => {
                            deleteTypeHandler(item);
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
  )
}
