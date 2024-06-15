import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SelectDoctor from './SelectDoctor';
import SimpleBackdrop from '../backdrop';
import SelectPatient from './SelectPatient';
import SelectDate from './SelectDate';
import SelectCondition from './SelectCondition';
import BoxReserveHistory from './BoxReserveHistory';
import { mainDomain } from '../../utils/mainDomain';
import FormHistoryVisit from '../VisitHistory/FormHistoryVisit';

export default function MainPageReserveHistory({changeStatePages}) {
  const [pageStateReserveHistory, setPageStateReserveHistory] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [patientUserId, setPatientUserId] = useState('');
  const [doctorId, setDoctorId] = useState(-1);
  const [fromPersianDate, setFromPersianDate] = useState(new Date().toLocaleDateString('fa-IR'));
  const [toPersianDate, setToPersianDate] = useState(new Date().toLocaleDateString('fa-IR'));
  const [statusId, setStatusId] = useState(-1);
  const [listReserveHistory, setListReserveHistory] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [flag, setFlag] = useState(false);
  const [receptionSelected, setReceptionSelected] = useState({});
  const [patient, setPatient] = useState({});

  useEffect(()=>{
    setPageStateReserveHistory(0)
  },[changeStatePages])

  // get list status
  useEffect(() => {
    axios
      .get(`${mainDomain}/api/Reservation/GetStatusList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setStatusList(Object.values(res.data));
      })
      .catch((err) => {});
  }, []);

  // get list doctor
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${mainDomain}/api/Doctor/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setDoctors(res.data);
        // setDoctorId(res.data[0].doctorId);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {pageStateReserveHistory === 0 && (
        <div>
          <div className="flex flex-wrap">
            <SelectDoctor setIsLoading={setIsLoading} doctorId={doctorId} setDoctorId={setDoctorId} doctors={doctors} />
            <SelectPatient setPatientUserId={setPatientUserId} />
            <SelectDate setFromPersianDate={setFromPersianDate} setToPersianDate={setToPersianDate} />
          </div>
          <div>
            <SelectCondition
              setStatusId={setStatusId}
              listReserveHistory={listReserveHistory}
              statusList={statusList}
              setFlag={setFlag}
            />
          </div>
          <div>
            <BoxReserveHistory
              patientUserId={patientUserId}
              doctorId={doctorId}
              fromPersianDate={fromPersianDate}
              toPersianDate={toPersianDate}
              statusId={statusId}
              setIsLoading={setIsLoading}
              listReserveHistory={listReserveHistory}
              setListReserveHistory={setListReserveHistory}
              isLoading={isLoading}
              flag={flag}
              setFlag={setFlag}
              setReceptionSelected={setReceptionSelected}
              setPageStateReserveHistory={setPageStateReserveHistory}
              patient={patient}
              setPatient={setPatient}
            />
          </div>
        </div>
      )}
      {pageStateReserveHistory === 1 && (
        <div>
          <FormHistoryVisit
            setPageStateReserveHistory={setPageStateReserveHistory}
            receptionSelected={receptionSelected}
            setIsLoading={setIsLoading}
            account={patient}
          />
        </div>
      )}

      {isLoading && <SimpleBackdrop />}
    </>
  );
}
