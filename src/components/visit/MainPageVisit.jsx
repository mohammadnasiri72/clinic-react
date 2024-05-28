import React, { useEffect, useState } from 'react';
import { Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { HiPencil } from 'react-icons/hi2';
import InputTypeVisit from './inputTypeVisit';
import ShowPatient from './ShowPatient';
import TablePatientDoing from './TablePatientDoing';
import InputDateVisit from './InputDateVisit';
import { mainDomain } from '../../utils/mainDomain';
import SecoundPageVisit from './SecoundPageVisit';
import SimpleBackdrop from '../backdrop';
import ShowNotPopUp from './ShowNotPopUp';
import CheckBoxDoctor from '../Reception/CheckBoxDoctor';

export default function MainPageVisit() {
  const [pageStateVisit, setPageStateVisit] = useState(0);
  const [valType, setValType] = useState(1);
  const [fromPersianDate, setFromPersianDate] = useState(new Date().toLocaleDateString('fa-IR'));
  const [toPersianDate, setToPersianDate] = useState(new Date().toLocaleDateString('fa-IR'));
  const [patList, setPatList] = useState([]);
  const [patSelected, setPatSelected] = useState([]);
  const [refreshPatList, setRefreshPatList] = useState(false);
  const [alignment, setAlignment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [medicalRecord, setMedicalRecord] = useState([]);
  const [valCondition, setValCondition] = useState([]);
  const disabledChechBox = true;


  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  
  const doneHandler = ()=>{
    // console.log(patSelected);
    setIsLoading(true)
    const data = new FormData();
    data.append('appointmentId', patSelected.appointmentId);
    axios
      .post(`${mainDomain}/api/Appointment/NextStatus`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false)
        setPageStateVisit(0)
        setRefreshPatList((e)=>!e)
        setPatSelected([])
        Toast.fire({
          icon: 'success',
          text: 'ویزیت با موفقیت انجام شد',
        });
      })
      .catch((err) => {
        setIsLoading(false)
      });

  }
  const backHandler = ()=>{
    // console.log(patSelected);
    setIsLoading(true)
    const data = new FormData();
    data.append('appointmentId', patSelected.appointmentId);
    axios
      .post(`${mainDomain}/api/Appointment/PrevStatus`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false)
        setPageStateVisit(0)
        setRefreshPatList((e)=>!e)
        setPatSelected([])
        Toast.fire({
          icon: 'success',
          text: 'بیمار سمت منشی فرستاده شد',
        });
      })
      .catch((err) => {
        setIsLoading(false)
      });

  }
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${mainDomain}/api/Appointment/GetList`, {
        params: {
          typeId: valType,
          // patientNationalId: userSelected.nationalId,
          doctorMedicalSystemId: -1,
          fromPersianDate,
          toPersianDate,
          statusId: -1,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setPatList(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [toPersianDate, fromPersianDate, valType, refreshPatList]);

  // get medicalRecord
  useEffect(() => {
    if (patSelected.appointmentId) {
      axios
        .get(`${mainDomain}/api/MedicalRecord/GetList`, {
          params: {
            appointmentId: patSelected.appointmentId,
            typeId: 1,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setMedicalRecord(res.data);
        })
        .catch((err) => {});
    }
  }, [patSelected]);
  return (
    <>
      {pageStateVisit === 0 && (
        <div>
          <div className="flex">
            <InputTypeVisit valType={valType} setValType={setValType} setIsLoading={setIsLoading} />
            <InputDateVisit setFromPersianDate={setFromPersianDate} setToPersianDate={setToPersianDate} />
          </div>
          <div className="flex flex-wrap mt-5">
            <div className="lg:w-1/4 w-full">
              <ShowPatient
                patList={patList}
                setRefreshPatList={setRefreshPatList}
                setPatSelected={setPatSelected}
                patSelected={patSelected}
                pageStateVisit={pageStateVisit}
              />
            </div>
            <div className="lg:w-3/4 w-full">
              <div className="">
                <TablePatientDoing
                  patSelected={patSelected}
                  valType={valType}
                  setPageStateVisit={setPageStateVisit}
                  setIsLoading={setIsLoading}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {pageStateVisit === 1 && (
        <div>
          <div className="text-start mb-5 flex justify-between">
            {/* <button
              onClick={() => setPageStateVisit(0)}
              className="bg-blue-500 text-white px-5 py-2 rounded-md duration-300 hover:bg-blue-600"
            >
              برگشت به صفحه قبل
            </button> */}
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
              className="p-2 rounded-md duration-300 mt-2 bg-teal-600"
              onClick={() => setPageStateVisit(0)}
              variant="contained"
            >
              برگشت به صفحه قبل
            </Button>
            <CheckBoxDoctor
            disabledChechBox={disabledChechBox}
              valCondition={valCondition}
              setValCondition={setValCondition}
              medicalRecord={medicalRecord}
            />
            <div className="flex">
              {/* <button onClick={()=> setShowNote(true)} className='px-3 py-2 rounded-md bg-slate-500 text-white duration-300 hover:bg-slate-600 flex justify-center items-center'>
                <HiPencil />
                <span className='px-2'>note</span>
                </button> */}
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
                className="p-2 rounded-md duration-300 mt-2 w-28"
                onClick={() => setShowNote(true)}
                variant="contained"
              >
                <HiPencil />
                <span className="px-2">note</span>
              </Button>
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={(event, newEvent) => setAlignment(newEvent)}
                aria-label="Platform"
              >
                {/* <ToggleButton onClick={()=> setShowNote(true)} value="note">
                  <span className="text-slate-500">note</span>
                </ToggleButton> */}
                <ToggleButton onClick={backHandler} value="back">
                  <span className="text-red-500">back</span>
                </ToggleButton>
                <ToggleButton onClick={doneHandler} value="done">
                  <span className="text-green-500">done</span>
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>
          <SecoundPageVisit patSelected={patSelected} setIsLoading={setIsLoading} />
        </div>
      )}
      {isLoading && <SimpleBackdrop />}
      <ShowNotPopUp showNote={showNote} setShowNote={setShowNote} />
    </>
  );
}
