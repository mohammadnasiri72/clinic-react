import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  MenuItem,
  Switch,
  TextField,
} from '@mui/material';
import axios from 'axios';
import { IoCloseSharp } from 'react-icons/io5';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';
import Iconify from '../Iconify';

export default function ModalEditCat({
  setIsLoading,
  setFlag2,
  handleCloseMenu,
  valTypeCategoryList,
  typeCategoryList,
}) {
  const [open, setOpen] = useState(false);
  const [titleCat, setTitleCat] = useState('');
  const [priority, setPriority] = useState(0);
  const [isActive, setisActive] = useState(true);
  const [descCat, setDescCat] = useState('');

  useEffect(() => {
    if (typeCategoryList && valTypeCategoryList) {
      const cat = typeCategoryList.find((e) => e.categoryId === valTypeCategoryList);
      if (cat) {
        setPriority(cat.priority);
        setisActive(cat.isActive);
        setDescCat(cat.description? cat.description : '');
        setTitleCat(cat.title);
      }
    }
  }, [valTypeCategoryList, typeCategoryList]);

  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  //   open modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  //   close modal
  const handleClose = () => {
    setOpen(false);
    handleCloseMenu();
  };

  //   edit category
  const editCatHandler = (id) => {
    if (titleCat.length === 0) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا عنوان دسته بندی را وارد کنید',
      });
    } else {
      setIsLoading(true);
      const data = {
        medicalCategoryId: id,
        title: titleCat,
        description: descCat,
        isActive,
        priority,
      };
      axios
        .post(`${mainDomain}/api/BasicInfo/Category/Update`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setIsLoading(false);
          setFlag2((e) => !e);
          setOpen(false);
          handleCloseMenu();
          Toast.fire({
            icon: 'success',
            text: 'دسته بندی با موفقیت ویرایش شد',
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
  };

  return (
    <>
      <>
        <MenuItem
          disabled={valTypeCategoryList === -1}
          onClick={() => {
            handleClickOpen();
          }}
          className="flex items-center "
        >
          <Iconify className="cursor-pointer text-2xl text-blue-400" icon={'eva:edit-fill'} />
          <span className="text-blue-400">ویرایش دسته بندی</span>
        </MenuItem>

        <Dialog sx={{ zIndex: '9999' }} fullWidth maxWidth="sm" open={open} onClose={handleClose}>
          <DialogTitle>ویرایش دسته بندی</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <IoCloseSharp />
          </IconButton>
          <DialogContent>
            <div className="flex flex-col items-center justify-start">
              {/* name category */}
              <div>
                <TextField
                  onChange={(e) => setTitleCat(e.target.value)}
                  className=" text-end duration-300 w-96"
                  id="outlined-multiline-flexible"
                  label="عنوان دسته بندی"
                  multiline
                  dir="rtl"
                  value={titleCat}
                  maxRows={4}
                />
              </div>
              {/* description category */}
              <div className="mt-3">
                <TextField
                  onChange={(e) => setDescCat(e.target.value)}
                  className=" text-end duration-300 w-96"
                  id="outlined-multiline-flexible"
                  label="توضیحات"
                  multiline
                  dir="rtl"
                  value={descCat}
                  maxRows={4}
                />
              </div>
              <div className="flex">
                {/* priority category */}
                <div className="mt-3">
                  <TextField
                    onChange={(e) => setPriority(e.target.value)}
                    className=" text-end w-20"
                    id="outlined-multiline-flexible"
                    label="اولویت"
                    multiline
                    dir="rtl"
                    value={priority}
                  />
                </div>
                {/* active category */}
                <div className="mt-5 pr-2">
                  <FormControlLabel
                    value={isActive}
                    onChange={() => setisActive(!isActive)}
                    control={<Switch checked={isActive} />}
                    label={isActive ? 'فعال' : 'غیر فعال'}
                  />
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => editCatHandler(valTypeCategoryList)}>ویرایش</Button>
          </DialogActions>
        </Dialog>
      </>
    </>
  );
}
