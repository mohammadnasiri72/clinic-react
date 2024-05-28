import axios from 'axios';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import Swal from 'sweetalert2';
import { Button, Paper } from '@mui/material';
import { mainDomain } from '../../utils/mainDomain';
import SimpleBackdrop from '../backdrop';
import DescriptionPatient from './DescriptionPatient';
import InputAge from './InputAge';
import InputNamePatient from './InputNamePatient';
import MedicineList from './MedicineList';
import SwitchPatientActive from './SwitchPatientActive';

export default function AddPatientPopUp({
  isOpenAddPatient,
  setIsOpenAddPatient,
  patientName,
  setPatientName,
  age,
  setAge,
  isPatientActive,
  setIsPatientActive,
  medicationIdList,
  setMedicationIdList,
  desc,
  setDesc,
  valueMedicine,
  setValueMedicine,
  patId,
}) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  const [isLoading, setIsLoading] = useState(false);
  const setPatientHandler = () => {
    setIsLoading(true);
    const dataPatient = {
      title: patientName,
      age,
      statusId: isPatientActive === 'true' ? 1 : 0,
      description: desc,
      medicationIdList,
    };
    axios
      .post(`${mainDomain}/api/PatientHistory/Add`, dataPatient, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setIsOpenAddPatient(!isOpenAddPatient);
        setPatientName('');
        setAge('');
        setIsPatientActive('true');
        setDesc('');
        setValueMedicine([]);
        Toast.fire({
          icon: 'success',
          text: 'بیماری با موفقیت ثبت شد',
        });
      })
      .catch((err) => {
        setIsLoading(false);
        Toast.fire({
          icon: 'error',
          text: err.response.data,
        });
      });
  };
  const editPatientHandler = () => {
    setIsLoading(true);
    const dataEdit = {
      patientHistoryId: patId,
      title: patientName,
      statusId: isPatientActive === 'true' ? 1 : 0,
      age,
      description: desc,
      medicationIdList,
    };
    axios
      .post(`${mainDomain}/api/PatientHistory/Update`, dataEdit, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        Toast.fire({
          icon: 'success',
          text: 'بیماری با موفقیت ثبت شد',
        });
        setIsOpenAddPatient(!isOpenAddPatient);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };
  return (
    <>
      <div
        style={{ zIndex: '1300', transform: isOpenAddPatient ? 'translateX(0)' : 'translateX(-100%)' }}
        className="fixed top-0 bottom-0 lg:right-2/3 sm:right-1/2 right-0 left-0 bg-slate-50 duration-500 p-5 shadow-lg overflow-y-auto"
      >
        <h3 className="text-2xl font-semibold ">افزودن بیماری</h3>
        <IoClose
          onClick={() => setIsOpenAddPatient(!isOpenAddPatient)}
          className="absolute right-5 top-5 text-4xl hover:scale-125 cursor-pointer duration-300 rounded-full bg-slate-300 p-2"
        />
        <div className=" mt-6">
          <InputNamePatient patientName={patientName} setPatientName={setPatientName} />
        </div>
        <div className=" mt-6">
          <InputAge setAge={setAge} age={age} />
        </div>
        <div className="mt-6">
          <SwitchPatientActive setIsPatientActive={setIsPatientActive} isPatientActive={isPatientActive} />
        </div>
        <div className="mt-6">
          <MedicineList
            isPatientActive={isPatientActive}
            setMedicationIdList={setMedicationIdList}
            valueMedicine={valueMedicine}
            setValueMedicine={setValueMedicine}
          />
        </div>
        <div className="mt-6">
          <DescriptionPatient setDesc={setDesc} desc={desc} />
        </div>
        <div className="p-2">
          {patId ? (
            <Button
              sx={{
                py: 1,
                boxShadow: 'none',
                // fontSize: 20,
                backgroundColor: 'rgb(16 185 129)',
                '&:hover': {
                  backgroundColor: 'rgb(5 150 105)',
                },
              }}
              className="p-2 rounded-md duration-300 whitespace-nowrap text-white"
              onClick={editPatientHandler}
              variant="contained"
            >
              ویرایش بیماری
            </Button>
          ) : (
            <Button
              sx={{
                py: 1,
                boxShadow: 'none',
                // fontSize: 20,
                backgroundColor: 'rgb(16 185 129)',
                '&:hover': {
                  backgroundColor: 'rgb(5 150 105)',
                },
              }}
              className="p-2 rounded-md duration-300 whitespace-nowrap text-white"
              onClick={setPatientHandler}
              variant="contained"
            >
              ثبت بیماری
            </Button>
          )}
        </div>
      </div>
      {isOpenAddPatient && (
        <Paper
          style={{ zIndex: '1299', backgroundColor: '#000c' }}
          onClick={() => setIsOpenAddPatient(!isOpenAddPatient)}
          className="fixed top-0 left-0 right-0 bottom-0"
        />
      )}
      {isLoading && <SimpleBackdrop />}
    </>
  );
}
