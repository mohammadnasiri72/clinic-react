import { IconButton, Tooltip } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { FaArrowRight } from 'react-icons/fa6';
import { mainDomain } from '../../utils/mainDomain';
import PrescriptionHistoryVisit from './PrescriptionHistoryVisit';
import OrderHistoryVisit from './OrderHistoryVisit';
import ProblemPatientHistoryVisit from './ProblemPatientHistoryVisit';
import DiagnosisHistoryVisit from './DiagnosisHistoryVisit';
import AdviceHistoryVisit from './AdviceHistoryVisit';
import FilesHistoryVisit from './FilesHistoryVisit';

export default function FormHistoryVisit({
  setPageStateVisitHistory,
  receptionSelected,
  setIsLoading,
  account,
  setPageState,
  setIsShowDetails,
  isLoading
}) {

  
  const [medicalRecord, setMedicalRecord] = useState([]);

  // get medicalrecoard
  useEffect(() => {
    if (receptionSelected.appointmentId) {
      setIsLoading(true);
      axios
        .get(`${mainDomain}/api/MedicalRecord/GetList`, {
          params: {
            appointmentId: receptionSelected.appointmentId,
            typeId: -1,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setIsLoading(false);
          setMedicalRecord(res.data);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  }, [receptionSelected]);

  return (
    <>
      <div className="text-start">
        <Tooltip title="برگشت به صفحه قبل" placement="bottom">
          <IconButton
            onClick={() => {
              if (setPageStateVisitHistory) {
                setPageStateVisitHistory(0);
              } else if (setPageState) {
                setPageState(0);
              }else if (setIsShowDetails) {
                setIsShowDetails(false)
              }
            }}
          >
            <FaArrowRight />
          </IconButton>
        </Tooltip>
      </div>

      <div className="border-2 p-2 rounded-lg">
        <div className="flex items-center">
          <div className="p-3">
            <img className="w-10 h-10 rounded-full" src={mainDomain + account.avatar} alt="" />
          </div>
          <div className="text-start">
            <p>
              {account.firstName} {account.lastName}
            </p>
            <p className="text-sm">{account.nationalId}</p>
          </div>
        </div>
        <div className='text-start font-semibold px-4'>
          <span>توضیحات : </span>
          <span>{receptionSelected.notes}</span>
        </div>
        <hr className="my-2 border-dotted border-2" />
        <div className="flex flex-wrap">
          <div className="lg:w-1/2 w-full border-l-2 border-dotted px-3">
            <ProblemPatientHistoryVisit medicalRecord={medicalRecord}/>
            <hr className="my-2 border-dotted border-2" />
            <DiagnosisHistoryVisit medicalRecord={medicalRecord} />
            <hr className="my-2 border-dotted border-2" />
            <AdviceHistoryVisit medicalRecord={medicalRecord} />
          </div>
          <div className="lg:w-1/2 w-full px-3 lg:mt-0 mt-4">
            <PrescriptionHistoryVisit receptionSelected={receptionSelected} setIsLoading={setIsLoading} isLoading={isLoading}/>
            <hr className="my-2 border-dotted border-2" />
            <OrderHistoryVisit receptionSelected={receptionSelected} setIsLoading={setIsLoading} />
            <hr className="my-2 border-dotted border-2" />
            <FilesHistoryVisit medicalRecord={medicalRecord} receptionSelected={receptionSelected} />
          </div>
        </div>
      </div>
    </>
  );
}
