import React, { useState } from 'react';
import SelectDoctor from './SelectDoctor';
import SimpleBackdrop from '../backdrop';
import SelectPatient from './SelectPatient';
import SelectDate from './SelectDate';
import SelectCondition from './SelectCondition';
import BoxReserveHistory from './BoxReserveHistory';

export default function MainPageReserveHistory() {
  const [isLoading, setIsLoading] = useState(false);
  const [patientUserId, setPatientUserId] = useState('');
  const [doctorId, setDoctorId] = useState(-1);
  const [fromPersianDate, setFromPersianDate] = useState(new Date().toLocaleDateString('fa-IR'));
  const [toPersianDate, setToPersianDate] = useState(new Date().toLocaleDateString('fa-IR'));
  const [statusId, setStatusId] = useState(-1);

  return (
    <>
      <div className="flex flex-wrap">
        <SelectDoctor setIsLoading={setIsLoading} doctorId={doctorId} setDoctorId={setDoctorId} />
        <SelectPatient setPatientUserId={setPatientUserId} />
        <SelectDate setFromPersianDate={setFromPersianDate} setToPersianDate={setToPersianDate} />
      </div>
      <div>
        <SelectCondition setStatusId={setStatusId}/>
      </div>
      <div>
        <BoxReserveHistory
          patientUserId={patientUserId}
          doctorId={doctorId}
          fromPersianDate={fromPersianDate}
          toPersianDate={toPersianDate}
          statusId={statusId}
          setIsLoading={setIsLoading}
        />
      </div>
      {isLoading && <SimpleBackdrop />}
    </>
  );
}
