import { Button, Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PiNotePencilLight } from 'react-icons/pi';
import Swal from 'sweetalert2';
import { FaTrashAlt } from 'react-icons/fa';
import { mainDomain } from '../../utils/mainDomain';
import ChechBoxDrug from './ChechBoxDrug';
import NameTemplate from './NameTemplate';

export default function Prescription({ patSelected, flag, setIsLoading, setFlag, templateId }) {
  const [listDrugSelected, setListDrugSelected] = useState([]);
  const [listDrugCheched, setListDrugCheched] = useState([]);
  const [prescriptionsId, setPrescriptionsId] = useState([]);
  const [listId, setListId] = useState([]);

  useEffect(() => {
    const arr = [];
    listDrugCheched.map((ev) => {
      arr.push(ev.prescriptionId);
      return true;
    });
    setListId(arr);
  }, [listDrugCheched]);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  // get list drug selected
  useEffect(() => {
    setPrescriptionsId([]);
    const arr = [];
    listDrugCheched.map((e) => {
      arr.push(e.prescriptionId);
      return true;
    });
    setPrescriptionsId(arr);
  }, [listDrugCheched]);

  useEffect(() => {
    setListDrugCheched([]);
    setIsLoading(true);
    axios
      .get(`${mainDomain}/api/Prescription/GetList`, {
        params: {
          appointmentId: patSelected.appointmentId,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setListDrugSelected(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [flag]);

  const editTemplateHandler = () => {
    setIsLoading(true);
    const data = {
      templateId,
      prescriptionsId,
    };
    axios
      .post(`${mainDomain}/api/PrescriptionTemplate/Update`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        Toast.fire({
          icon: 'success',
          text: 'تمپلیت با موفقیت ویرایش شد',
        });
      })
      .catch((err) => {
        setIsLoading(false);
        Toast.fire({
          icon: 'error',
          text: err.response ? err.response.data : 'خطای شبکه',
        });
      });
  };
  const deleteAllHandler = () => {
    const data = new FormData();
    listId.map((e) => {
      data.append('prescriptionIdList', e);
      return true;
    });
    axios
      .post(`${mainDomain}/api/Prescription/Delete`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setFlag((e) => !e);
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
  };

  const classBtnActiv = 'px-3 py-2 rounded-md text-white flex items-center bg-green-500 hover:bg-green-600';
  const classBtnDisActive = 'px-3 py-2 rounded-md text-white flex items-center bg-slate-300';

  return (
    <>
      <div className="text-start w-full min-h-[90vh]">
        <div className="text-center">
          <h3 className="text-xl font-semibold ">جزئیات نسخه</h3>
          <p className="text-xs">تاریخ ویزیت: {patSelected.appointmentDateFA}</p>
        </div>
        <hr className="mt-2" />
        {listDrugSelected.length > 0 && (
          <div className="bg-slate-100 rounded-lg flex justify-between" dir="ltr">
            <FormControlLabel
              onChange={() => {
                if (listDrugCheched.length === listDrugSelected.length && listDrugCheched.length !== 0) {
                  setListDrugCheched([]);
                } else {
                  setListDrugCheched(listDrugSelected);
                }
              }}
              control={
                <Checkbox
                  checked={listDrugCheched.length === listDrugSelected.length && listDrugCheched.length !== 0}
                  indeterminate={listDrugSelected.length > listDrugCheched.length && listDrugCheched.length !== 0}
                />
              }
              label={'انتخاب همه'}
              // value={valAllChechBox}
            />

            {/* <button onClick={deleteAllHandler} disabled={prescriptionsId.length === 0} className="flex justify-center items-center pr-5">
              <FaTrashAlt
                style={{ color: prescriptionsId.length === 0? 'rgb(203 213 225)' : 'rgb(51 65 85)' }}
                className="text-lg duration-300"
              />
            </button> */}
            <Button
              sx={{
                py: 1,
                boxShadow: 'none',
                // fontSize: 20,
                backgroundColor: 'rgb(248 113 113)',
                '&:hover': {
                  backgroundColor: 'rgb(239 68 68)',
                },
              }}
              className="p-2 rounded-md duration-300 mt-2"
              onClick={deleteAllHandler}
              disabled={prescriptionsId.length === 0}
              variant="contained"
            >
              <FaTrashAlt
                style={{ color: prescriptionsId.length === 0 ? 'rgb(203 213 225)' : 'rgb(51 65 85)' }}
                className="text-lg duration-300"
              />
            </Button>
          </div>
        )}
        {listDrugSelected.length === 0 && <p className="text-center mt-5">نسخه خالی است</p>}

        {listDrugSelected.map((e, i) => (
          <ChechBoxDrug
            listDrugSelected={listDrugSelected}
            key={e.prescriptionId}
            e={e}
            setFlag={setFlag}
            setIsLoading={setIsLoading}
            setListDrugCheched={setListDrugCheched}
            listDrugCheched={listDrugCheched}
          />
        ))}
      </div>
      <div className="flex justify-around w-full">
        <NameTemplate setIsLoading={setIsLoading} listDrugCheched={listDrugCheched} />
        {templateId !== -1 && (
          // <button onClick={editTemplateHandler} className={prescriptionsId.length === 0? classBtnDisActive : classBtnActiv}>
          //   <span className="px-1">ویرایش تمپلیت</span>
          //   <PiNotePencilLight />
          // </button>
          <Button
            sx={{
              py: 1,
              boxShadow: 'none',
              // fontSize: 20,
              backgroundColor: 'rgb(20 184 166)',
              '&:hover': {
                backgroundColor: 'rgb(13 148 136)',
              },
            }}
            className={prescriptionsId.length === 0 ? classBtnDisActive : classBtnActiv}
            onClick={editTemplateHandler}
            variant="contained"
          >
            <span className="px-1">ویرایش تمپلیت</span>
            <PiNotePencilLight />
          </Button>
        )}
      </div>
    </>
  );
}
