import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { IoIosArrowUp } from 'react-icons/io';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';
import SimpleBackdrop from '../backdrop';
import ModalEditCat from './ModalEditCat';
import ModalNewCat from './ModalNewCat';
import TableManageInfo from './TableManageInfo';

export default function MainPageManagInformation() {
  const [isLoading, setIsLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const [typeList, setTypeList] = useState([]);
  const [valTypeList, setValTypeList] = useState('');
  const [typeCategoryList, setTypeCategoryList] = useState([]);
  const [valTypeCategoryList, setValTypeCategoryList] = useState(-1);
  const [titleType, setTitleType] = useState('');
  const [priority, setPriority] = useState(0);
  const [isActive, setisActive] = useState(true);
  const [descType, setDescType] = useState('');
  const [alignment, setAlignment] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const openOperation = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  // get list typeList & category type
  useEffect(() => {
    axios
      .get(`${mainDomain}/api/BasicInfo/Type/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setTypeList(res.data);
        setValTypeList(res.data[0].typeId);
      })
      .catch((err) => {});
  }, [flag]);

  useEffect(() => {
    if (valTypeList) {
      axios
        .get(`${mainDomain}/api/BasicInfo/Category/GetList`, {
          params: {
            typeId: valTypeList,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setTypeCategoryList(res.data);
        })
        .catch((err) => {});
    }
  }, [flag, valTypeList, flag2]);

  // set new type
  const newTypeHandler = (alignment) => {
    if (alignment === 'newItem') {
      Swal.fire({
        title: 'ثبت تایپ جدید',
        text: 'آیا از ثبت تایپ جدید مطمئن هستید؟',
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: '#d33',
        cancelButtonText: 'انصراف',
        confirmButtonText: 'تایید ',
      }).then((result) => {
        if (result.isConfirmed) {
          setIsLoading(true);
          const data = {
            medicalCategoryId: valTypeCategoryList,
            name: titleType,
            description: descType,
            isActive,
            priority,
          };
          axios
            .post(`${mainDomain}/api/BasicInfo/Item/Add`, data, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            })
            .then((res) => {
              Toast.fire({
                icon: 'success',
                text: 'تایپ با موفقیت ثبت شد',
              });
              setDescType('');
              setisActive(true);
              setPriority(0);
              setIsLoading(false);
              setFlag((e) => !e);
              setTitleType('');
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
  };

  // delete category
  const deleteCategoryHandler = (cat) => {
    Swal.fire({
      title: 'حذف دسته بندی',
      text: 'آیا از حذف دسته بندی مطمئن هستید؟',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'green',
      cancelButtonText: 'انصراف',
      confirmButtonText: 'حذف ',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const data = new FormData();
        data.append('categoryId', cat);
        axios
          .post(`${mainDomain}/api/BasicInfo/Category/Delete`, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((res) => {
            Toast.fire({
              icon: 'success',
              text: 'حذف دسته بندی با موفقیت انجام شد',
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
      <div className="text-start relative">
        <div className="flex ">
          {/* select title type */}
          <div>
            <FormControl color="primary" className="w-56">
              <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
                لیست تایپ ها
              </InputLabel>
              <Select
                onChange={(e) => {
                  setValTypeList(e.target.value);
                  setValTypeCategoryList(-1);
                  setAlignment('');
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="لیست تایپ ها"
                color="primary"
                value={valTypeList}
              >
                {typeList.map((e) => (
                  <MenuItem key={e.typeId} value={e.typeId}>
                    {e.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          {/* select category type */}
          <div className="pr-2 flex items-center">
            <FormControl color="primary" className="w-56">
              <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
                لیست دسته بندی های تایپ
              </InputLabel>
              <Select
                onChange={(e) => setValTypeCategoryList(e.target.value)}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="لیست دسته بندی های تایپ"
                color="primary"
                value={valTypeCategoryList}
              >
                {typeCategoryList.map((e) => (
                  <MenuItem key={e.categoryId} value={e.categoryId}>
                    <div className="flex justify-between w-full relative">
                      <span>{e.title}</span>
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <div>
              <Button
                id="basic-button"
                aria-controls={openOperation ? 'basic-menu' : undefined}
                aria-haspopup="true"
                // eslint-disable-next-line no-restricted-globals
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                عملیات
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openOperation}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <ModalNewCat
                  setIsLoading={setIsLoading}
                  setFlag2={setFlag2}
                  handleCloseMenu={handleClose}
                  valTypeList={valTypeList}
                />
                <ModalEditCat
                  setIsLoading={setIsLoading}
                  setFlag2={setFlag2}
                  handleCloseMenu={handleClose}
                  valTypeCategoryList={valTypeCategoryList}
                  typeCategoryList={typeCategoryList}
                />

                <MenuItem
                  disabled={valTypeCategoryList === -1}
                  onClick={() => {
                    handleClose();
                    deleteCategoryHandler(valTypeCategoryList);
                  }}
                >
                  <div className="flex items-center px-1 text-red-400">
                    <FaTrashAlt />
                    <span className="px-1">حذف دسته بندی</span>
                  </div>
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment} aria-label="text alignment">
            <ToggleButton disabled={valTypeCategoryList === -1} value="newItem" aria-label="left aligned">
              افزودن آیتم جدید
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div
          style={{
            opacity: alignment === 'newItem' ? '1' : '0',
            visibility: alignment === 'newItem' ? 'visible' : 'hidden',
            height: alignment === 'newItem' ? '18rem' : '0',
            zIndex: '12',
          }}
          className="border overflow-hidden sticky top-12 left-0 right-0 bottom-0 duration-500 px-3 bg-white shadow-lg"
        >
          <Button
          sx={{
            py: 1,
            position:'absolute',
            bottom:'0',
            left: '50%',
            transform:'translate(-50% , 50%)',
            borderRadius:'100%',
            boxShadow: 'none',
            backgroundColor: 'rgb(226 232 240)',
            '&:hover': {
              backgroundColor: 'rgb(203 213 225)',
            },
          }}
          onClick={() => setAlignment('')} className="absolute bottom-0 left-1/2">
            <IoIosArrowUp className="text-3xl rounded-t-full w-14 -translate-y-3 duration-300" />
          </Button>
          <div className="flex mt-3">
            {/* set title */}
            {alignment === 'newItem' && (
              <div className="text-start" dir="rtl">
                <TextField
                  onChange={(e) => setTitleType(e.target.value)}
                  className=" text-end w-96"
                  id="outlined-multiline-flexible"
                  label="عنوان آیتم"
                  multiline
                  dir="rtl"
                  value={titleType}
                  maxRows={4}
                />
              </div>
            )}

            {/* select priority */}
            {alignment === 'newItem' && (
              <div className="pr-2">
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
            )}

            {/* select condition */}
            {alignment === 'newItem' && (
              <div className="pr-5 mt-1">
                <FormControlLabel
                  value={isActive}
                  onChange={() => setisActive(!isActive)}
                  control={<Switch checked={isActive} />}
                  label={isActive ? 'فعال' : 'غیر فعال'}
                />
              </div>
            )}
          </div>
          <div className="flex items-center">
            {/* set description */}
            {alignment === 'newItem' && (
              <div className="text-start mt-3 w-1/2" dir="rtl">
                <TextField
                  onChange={(e) => setDescType(e.target.value)}
                  className=" text-end w-full"
                  id="outlined-multiline-flexible"
                  label="توضیحات"
                  multiline
                  dir="rtl"
                  value={descType}
                  minRows={3}
                />
              </div>
            )}
          </div>
          <div className="mt-3">
            <Button
             sx={{
              boxShadow: 'none',
              backgroundColor: 'rgb(16 185 129)',
              '&:hover': {
                backgroundColor: 'rgb(5 150 105)',
              },
            }}
              onClick={() => newTypeHandler(alignment)}
              className="px-5 py-2 rounded-md bg-green-500 duration-300 hover:bg-green-600 text-white font-semibold"
            >
              ثبت
            </Button>
          </div>
        </div>
        <div className="mt-5">
          <TableManageInfo
            valTypeList={valTypeList}
            valTypeCategoryList={valTypeCategoryList}
            setIsLoading={setIsLoading}
            flag={flag}
            setFlag={setFlag}
          />
        </div>
      </div>
      {isLoading && <SimpleBackdrop />}
    </>
  );
}
