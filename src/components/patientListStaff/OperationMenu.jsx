import { Button, IconButton, Paper, Tooltip } from '@mui/material';
import Menu from '@mui/material/Menu';
import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaEye } from 'react-icons/fa';
import { MdOutlineMoreTime } from 'react-icons/md';
import { TiGroup } from 'react-icons/ti';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';
import Iconify from '../Iconify';
import AddRelativePatient from './AddRelativePatient';
import RelativePatient from './RealativePatient';
import DetailsPatient from './DetailsPatient';

export default function OperationMenu({
  setAccountUpdate,
  setPageState,
  pat,
  setIsLoading,
  setFlag,
  flag,
  patient,
  setPatient,
  setReceptionSelected
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpenAccompanying, setIsOpenAccompanying] = useState(false);
  const [isOpenAddRelative, setIsOpenAddRelative] = useState(false);
  const [PatientRelative, setPatientRelative] = useState([]);

  const [editRelative, setEditRelative] = useState({});
  const [showDetailsPatient, setShowDetailsPatient] = useState(false);

  useEffect(() => {
    if (isOpenAccompanying || isOpenAddRelative) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [isOpenAccompanying, isOpenAddRelative]);
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const editPatientHandler = (e) => {
    handleClose();
    setPageState(1);
    setAccountUpdate(e);
  };
  const deletePatientHandler = (e) => {
    handleClose();
    Swal.fire({
      title: 'حذف بیمار',
      text: 'آیا از ثبت درخواست خود مطمئن هستید؟',

      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'green',
      cancelButtonText: 'انصراف',
      confirmButtonText: 'حذف کاربر',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const data = new FormData();
        data.append('patientUserId', e.userId);
        axios
          .post(`${mainDomain}/api/Patient/Delete`, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((res) => {
            setIsLoading(false);
            setFlag((e) => !e);
            Toast.fire({
              icon: 'success',
              text: 'کاربر مورد نظر با موفقیت حذف شد',
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
  const accompanyingPatientHandler = (e) => {
    setIsOpenAccompanying(true);
    handleClose();
    setPatient(e);
  };
  const reserveToPatientHandler = (e) => {
    setAccountUpdate(e);
    setPageState(3);
  };
  useEffect(() => {
    if (patient.nationalId) {
      axios
        .get(`${mainDomain}/api/PatientRelative/Patient/GetList`, {
          params: {
            nationalId: patient.nationalId,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setPatientRelative(res.data);
        })
        .catch((err) => {});
    }
  }, [patient, isOpenAccompanying, isOpenAddRelative, flag]);
  return (
    <>
      <div>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <BsThreeDotsVertical className="cursor-pointer text-2xl" />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <div className="px-4">
            <Tooltip title="ویرایش" placement="right">
              <IconButton onClick={() => editPatientHandler(pat)}>
                <Iconify icon={'eva:edit-fill'} />
              </IconButton>
            </Tooltip>
          </div>

          <div className="px-4">
            <Tooltip title="همراه" placement="right">
              <IconButton onClick={() => accompanyingPatientHandler(pat)}>
                <TiGroup />
              </IconButton>
            </Tooltip>
          </div>
          <div className="px-4">
            <Tooltip title="مشاهده جزئیات" placement="right">
              <IconButton
                onClick={() => {
                  setShowDetailsPatient(true);
                  handleClose();
                  setPatient(pat);
                }}
              >
                <FaEye />
              </IconButton>
            </Tooltip>
          </div>
          <div className="px-4">
            <Tooltip title="نوبت دهی اینترنتی" placement="right">
              <IconButton onClick={() => reserveToPatientHandler(pat)}>
                <MdOutlineMoreTime />
              </IconButton>
            </Tooltip>
          </div>
          <div className="px-4">
            <Tooltip title="حذف" placement="right">
              <IconButton onClick={() => deletePatientHandler(pat)}>
                <Iconify className="text-red-500" icon={'eva:trash-2-outline'} />
              </IconButton>
            </Tooltip>
          </div>
        </Menu>
      </div>

      <RelativePatient
        isOpenAccompanying={isOpenAccompanying}
        PatientRelative={PatientRelative}
        setIsOpenAddRelative={setIsOpenAddRelative}
        setIsOpenAccompanying={setIsOpenAccompanying}
        setEditRelative={setEditRelative}
        setFlag={setFlag}
      />
      <AddRelativePatient
        isOpenAddRelative={isOpenAddRelative}
        setIsOpenAddRelative={setIsOpenAddRelative}
        patient={patient}
        editRelative={editRelative}
      />
      <DetailsPatient
        showDetailsPatient={showDetailsPatient}
        setShowDetailsPatient={setShowDetailsPatient}
        patient={patient}
        setPageState={setPageState}
        setReceptionSelected={setReceptionSelected}
      />
      {(isOpenAccompanying || isOpenAddRelative || showDetailsPatient) && (
        <Paper
          sx={{ backgroundColor: '#000c' }}
          style={{ zIndex: 1200 }}
          onClick={() => {
            setIsOpenAccompanying(false);
            setIsOpenAddRelative(false);
            setShowDetailsPatient(false);
          }}
          className="fixed top-0 left-0 right-0 bottom-0"
        />
      )}
    </>
  );
}
