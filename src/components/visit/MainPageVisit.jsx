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
import FormHistoryVisit from '../VisitHistory/FormHistoryVisit';

export default function MainPageVisit({changeStatePages}) {
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
  const [account, setAccount] = useState([]);
  const [pageStateVisitHistory, setPageStateVisitHistory] = useState(0);
  const [receptionSelected, setReceptionSelected] = useState([]);
  const disabledChechBox = true;

  useEffect(()=>{
    setPageStateVisit(0)
    setPageStateVisitHistory(0)
  },[changeStatePages])

  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  const doneHandler = () => {
    setIsLoading(true);
    const data = new FormData();
    data.append('appointmentId', patSelected.appointmentId);
    axios
      .post(`${mainDomain}/api/Appointment/NextStatus`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setPageStateVisit(0);
        setRefreshPatList((e) => !e);
        setPatSelected([]);
        Toast.fire({
          icon: 'success',
          text: 'ویزیت با موفقیت انجام شد',
        });
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const backHandler = () => {
    setIsLoading(true);
    const data = new FormData();
    data.append('appointmentId', patSelected.appointmentId);
    axios
      .post(`${mainDomain}/api/Appointment/PrevStatus`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setPageStateVisit(0);
        setRefreshPatList((e) => !e);
        setPatSelected([]);
        Toast.fire({
          icon: 'success',
          text: 'بیمار سمت منشی فرستاده شد',
        });
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${mainDomain}/api/Appointment/GetList`, {
        params: {
          typeId: valType,
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

  useEffect(()=>{
    setPatSelected([])
  },[patList])

  return (
    <>
      {pageStateVisitHistory === 0 && (
        <div>
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
                      setPageStateVisitHistory={setPageStateVisitHistory}
                      setAccount={setAccount}
                      setReceptionSelected={setReceptionSelected}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {pageStateVisit === 1 && (
            <div>
              <div className="mb-5 flex items-center flex-wrap">
                <div className='lg:w-1/6 w-full text-start'>
                <Button
                  sx={{
                    py: 1,
                    boxShadow: 'none',
                    backgroundColor: 'rgb(20 184 166)',
                    '&:hover': {
                      backgroundColor: 'rgb(13 148 136)',
                    },
                  }}
                  className="p-2 rounded-md duration-300 mt-2 text-white"
                  onClick={() => setPageStateVisit(0)}
                  variant="contained"
                >
                  برگشت به صفحه قبل
                </Button>
                </div>
                <div className='lg:w-2/3 w-full'>
                <CheckBoxDoctor
                  disabledChechBox={disabledChechBox}
                  valCondition={valCondition}
                  setValCondition={setValCondition}
                  medicalRecord={medicalRecord}
                />
                </div>
                <div className="flex lg:w-1/6 w-full">
                  <Button
                    sx={{
                      py: 1,
                      boxShadow: 'none',
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
                    <span className="px-2 text-white">note</span>
                  </Button>
                  <ToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={(event, newEvent) => setAlignment(newEvent)}
                    aria-label="Platform"
                  >
                    <ToggleButton onClick={backHandler} value="back">
                      <span className="text-red-500">back</span>
                    </ToggleButton>
                    <ToggleButton onClick={doneHandler} value="done">
                      <span className="text-green-500">done</span>
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
              </div>
              <SecoundPageVisit patSelected={patSelected} setIsLoading={setIsLoading} isLoading={isLoading} />
            </div>
          )}
        </div>
      )}
      {pageStateVisitHistory === 1 && (
        <div>
          <FormHistoryVisit
            setPageStateVisitHistory={setPageStateVisitHistory}
            receptionSelected={receptionSelected}
            setIsLoading={setIsLoading}
            account={account}
            isLoading={isLoading}
          />
        </div>
      )}
      {isLoading && <SimpleBackdrop />}
      <ShowNotPopUp showNote={showNote} setShowNote={setShowNote} />
    </>
  );
}
