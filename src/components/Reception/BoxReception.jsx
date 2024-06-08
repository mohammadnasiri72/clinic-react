import { Box } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';
import DetailsPatient from '../patientListStaff/DetailsPatient';
import CardReception from './CardReception';
import MessageHandler from './MessageHandler';

export default function BoxReception({
  receptions,
  statusCondition,
  setChangStatusCondition,
  setPageStateReception,
  setUserSelected,
  setEditeUser,
  setIsEditStartTime,
  setIsEditEndTime,
  setIsLoading
}) {
  const [patient, setPatient] = useState({});
  const [patientId, setPatientId] = useState('');
  const [historyReception, setHistoryReception] = useState([]);
  // const [receptionSelected, setReceptionSelected] = useState([]);
  const [showDetailsPatient, setShowDetailsPatient] = useState(false);
  const [openBoxMessage, setOpenBoxMessage] = useState(false);
  const [userId , setUserId] = useState([])

  useEffect(() => {
    if (patientId.length > 0) {
      axios
        .get(`${mainDomain}/api/Patient/GetList`, {
          params: {
            query: patientId,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setPatient(res.data[0]);
        })
        .catch((err) => {
          // setIsLoading(false);
        });
    }
  }, [patientId]);

  useEffect(() => {
    if (patient) {
      axios
        .get(`${mainDomain}/api/Appointment/GetList`, {
          params: {
            typeId: 1,
            patientNationalId: patient.nationalId,
            doctorMedicalSystemId: -1,

            statusId: -1,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setHistoryReception(res.data);
        })
        .catch((err) => {});
    }
  }, [patient]);

  useEffect(() => {
    if (showDetailsPatient) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [showDetailsPatient]);


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
                  setChangStatusCondition={setChangStatusCondition}
                  setPageStateReception={setPageStateReception}
                  setEditeUser={setEditeUser}
                  setIsEditStartTime={setIsEditStartTime}
                  setIsEditEndTime={setIsEditEndTime}
                  setShowDetailsPatient={setShowDetailsPatient}
                  setPatientId={setPatientId}
                  setOpenBoxMessage={setOpenBoxMessage}
                  setUserId={setUserId}
                />
              </div>
            ))}
        {statusCondition.length === 0 &&
          receptions.map((reception, i) => (
            <div className="px-2 w-1/4 flex justify-center mt-3" key={i}>
              <CardReception
                reception={reception}
                setChangStatusCondition={setChangStatusCondition}
                setPageStateReception={setPageStateReception}
                setUserSelected={setUserSelected}
                setEditeUser={setEditeUser}
                setIsEditStartTime={setIsEditStartTime}
                setIsEditEndTime={setIsEditEndTime}
                setShowDetailsPatient={setShowDetailsPatient}
                setPatientId={setPatientId}
                setOpenBoxMessage={setOpenBoxMessage}
                setUserId={setUserId}
              />
            </div>
          ))}
      </div>
      <MessageHandler 
      open={openBoxMessage}
      setOpen={setOpenBoxMessage}
      userId={userId}
      setIsLoading={setIsLoading}
      />
      <DetailsPatient
        showDetailsPatient={showDetailsPatient}
        setShowDetailsPatient={setShowDetailsPatient}
        patient={patient}
        historyReception={historyReception}
      />
      <Box sx={{zIndex:'1300'}} onClick={()=> setShowDetailsPatient(false)} style={{display: showDetailsPatient?'block':'none'}} className='fixed top-0 bottom-0 left-0 right-0 bg-[#000c]'/>
    </>
  );
}


