import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CardReception from './CardReception';
import { mainDomain } from '../../utils/mainDomain';

export default function BoxReception({
  receptions,
  statusCondition,
  setChangStatusCondition,
  setPageStateReception,
  setUserSelected,
  setEditeUser,
  setIsEditStartTime,
  setIsEditEndTime,
}) {
  const [patientList , setPatientList] = useState([])

  useEffect(() => {
   
      axios
        .get(`${mainDomain}/api/Patient/GetList`, {
          
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setPatientList(res.data);
        })
        .catch((err) => {});
    
  }, []);


  return (
    <>
      <div className="flex flex-wrap justify-start items-start">
        {receptions.length === 0 && <p>صفحه پذیرش خالی است</p>}
        {statusCondition.length > 0 &&
          receptions
            .filter((ev) => ev.status === statusCondition)
            .map((reception, i) => (
              <div className="px-2 w-1/4 flex justify-center mt-3" key={i}>
                <CardReception
                  reception={reception}
                  patientList={patientList}
                  setChangStatusCondition={setChangStatusCondition}
                  setPageStateReception={setPageStateReception}
                  setUserSelected={setUserSelected}
                  setEditeUser={setEditeUser}
                  setIsEditStartTime={setIsEditStartTime}
                  setIsEditEndTime={setIsEditEndTime}
                />
              </div>
            ))}
        {statusCondition.length === 0 &&
          receptions.map((reception, i) => (
            <div className="px-2 w-1/4 flex justify-center mt-3" key={i}>
              <CardReception
                reception={reception}
                patientList={patientList}
                setChangStatusCondition={setChangStatusCondition}
                setPageStateReception={setPageStateReception}
                setUserSelected={setUserSelected}
                setEditeUser={setEditeUser}
                setIsEditStartTime={setIsEditStartTime}
                setIsEditEndTime={setIsEditEndTime}
              />
            </div>
          ))}
      </div>
    </>
  );
}
