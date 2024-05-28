import React from 'react';
import CardReception from './CardReception';

export default function BoxReception({
  receptions,
  patientList,
  statusCondition,
  setChangStatusCondition,
  setPageStateReception,
  setUserSelected,
  setEditeUser,
  setIsEditStartTime,
  setIsEditEndTime,
}) {
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
