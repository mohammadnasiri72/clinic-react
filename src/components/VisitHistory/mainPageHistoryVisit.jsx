import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import SimpleBackdrop from '../backdrop';
import { mainDomain } from '../../utils/mainDomain';
import BoxReceptionPatient from './BoxReceptionPatient';
import FormHistoryVisit from './FormHistoryVisit';
import InputTypeVisit from '../visit/inputTypeVisit';
import InputDateVisit from '../visit/InputDateVisit';

export default function MainPageVisitHistory({ account }) {
  const [pageStateVisitHistory, setPageStateVisitHistory] = useState(0);
  const [valType, setValType] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [fromPersianDate, setFromPersianDate] = useState('');
  const [toPersianDate, setToPersianDate] = useState('');
  const [historyReception, setHistoryReception] = useState([]);
  const [receptionSelected, setReceptionSelected] = useState({});

  useEffect(() => {
    setIsLoading(true)
    axios
      .get(`${mainDomain}/api/Appointment/GetList`, {
        params: {
          typeId: valType,
          patientNationalId: account.nationalId,
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
        setIsLoading(false)
        setHistoryReception(res.data);
      })
      .catch((err) => {
        setIsLoading(false)
      });
  }, [account, valType, fromPersianDate, toPersianDate]);
  return (
    <>
      {pageStateVisitHistory === 0 && (
        <div>
          <div className="flex ">
            <InputTypeVisit valType={valType} setValType={setValType} setIsLoading={setIsLoading} />
            <InputDateVisit setFromPersianDate={setFromPersianDate} setToPersianDate={setToPersianDate} />
          </div>
          <hr className="mt-3" />
          <div className="flex flex-wrap px-5">
            {historyReception.map((e) => (
              <div key={e.appointmentId} className="lg:w-1/3 sm:w-1/2 w-full px-3 mt-3">
                <BoxReceptionPatient
                  reception={e}
                  setPageStateVisitHistory={setPageStateVisitHistory}
                  setReceptionSelected={setReceptionSelected}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {pageStateVisitHistory === 1 && (
        <FormHistoryVisit
          setPageStateVisitHistory={setPageStateVisitHistory}
          receptionSelected={receptionSelected}
          setIsLoading={setIsLoading}
          account={account}
          isLoading={isLoading}
        />
      )}

      {isLoading && <SimpleBackdrop />}
    </>
  );
}
