import { Button, Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { TiDelete } from "react-icons/ti";
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';

export default function ChechBoxDrug({
  e,
  listDrugSelected,
  setFlag,
  setIsLoading,
  listDrugCheched,
  setListDrugCheched,
}) {
  
  const [valChechBox, setValChechBox] = useState(false);
  
  

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });
  



  const deleteDrugHandler = () => {
    setIsLoading(true);
    const data = new FormData();
    data.append('prescriptionIdList', e.prescriptionId)
    axios
      .post(`${mainDomain}/api/Prescription/Delete`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setFlag((e) => !e);
        setListDrugCheched(listDrugCheched.filter((ev) => ev.prescriptionId !== e.prescriptionId));
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
  useEffect(()=>{
    if (listDrugCheched.length === listDrugSelected.length && listDrugCheched.length !==0) {
      setValChechBox(true)
    }
    if (listDrugCheched.length ===0) {
      setValChechBox(false)
    }
  },[listDrugCheched , listDrugSelected])
  return (
    <>
      <div dir="ltr" className="flex justify-between rounded-lg bg-slate-50 mt-3 border text-xs">
        <div className=" flex items-center">
          <FormControlLabel
            onChange={() => {
              
              
              if (listDrugCheched.includes(e)) {
                setListDrugCheched(listDrugCheched.filter((ev) => ev.prescriptionId !== e.prescriptionId));
                setValChechBox(false);
              } else {
                setListDrugCheched([...listDrugCheched, e]);
                setValChechBox(true)
              }
            }}
            control={<Checkbox checked={valChechBox} />}
            label={''}
          />

          <div className="px-4">
            <div className="flex items-center">
              <span className="px-1">{e.medicationName}</span>
              <span className="px-1">{e.form}</span>
              <span className="px-1">{e.frequency}</span>
              <span className="px-1">{e.dosage}</span>
            </div>
            <span className="pl-4">{e.instructions}</span>
          </div>
        </div>
        {/* <button onClick={deleteDrugHandler} className="flex justify-center items-center pr-5">
          <TiDelete className="text-2xl duration-300 text-red-400" />
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
        onClick={deleteDrugHandler}
        variant="contained"
      >
         <TiDelete className="text-2xl duration-300" />
      </Button>
      </div>
    </>
  );
}
