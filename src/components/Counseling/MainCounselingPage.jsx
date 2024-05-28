import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { FaPlus } from 'react-icons/fa6';
import SelectServices from './SelectServices';
import PatientListVisit from './PatientListVisit';
import ProblemPatient from './ProblemPatient';
import UploadDocuments from './UploadDocuments';
import { mainDomain } from '../../utils/mainDomain';
import TableReqPatient from './TableReqPatient';
import StepperService from './StepperService';

export default function MainCounselingPage({account}) {
  const [pageNumber, setPageNumber] = useState(0);
  const [valDoctor, setValDoctor] = useState([]);
  const [service, setService] = useState([]);
  const [reqPatient, setReqPatient] = useState([]);
  const [apointmentId, setApointmentId] = useState('');
  const [flagUpload, setFlagUpload] = useState(false);
  const [activeStep, setActiveStep] = React.useState(pageNumber - 1);
  const [filesUpload, setFilesUpload] = useState([]);
  const [isShowImg, setIsShowImg] = useState(false);
  const [isShowAudio, setIsShowAudio] = useState(false);
  const [isShowVideo, setIsShowVideo] = useState(false);
  const [src, setSrc] = useState('');
  const [srcVideo, setSrcVideo] = useState('');
  const [srcAudio, setSrcAudio] = useState('');



  useEffect(() => {
    setActiveStep(pageNumber - 1);
  }, [pageNumber]);
  const setRequestHandler = () => {
    setPageNumber(1);
  };
  useEffect(() => {
    axios
      .get(`${mainDomain}/api/AppointmentCounseling/GetList`, {
        params: {
          patientNationalId: '',
          doctorMedicalSystemId: -1,
          fromPersianDate: '',
          toPersianDate: '',
          statusId: -1,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setReqPatient(res.data);
      })
      .catch((err) => {});
  }, [flagUpload]);
  return (
    <>
      {pageNumber !== 0 && (
        <div className="w-full bg-slate-50 text-start p-3 mb-3 text-xl font-semibold">
          <StepperService activeStep={activeStep} setActiveStep={setActiveStep} />
        </div>
      )}
      {pageNumber === 0 && (
        <div className="w-11/12 border rounded-md">
          <h3 className="bg-[#f4f6f8] rounded-t-md font-semibold text-xl text-gray-600 p-2">لیست درخواست های من</h3>
          <div className="text-start p-3">
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
              onClick={setRequestHandler}
              variant="contained"
            >
              <span className="px-2">ثبت درخواست جدید</span>
              <FaPlus />
            </Button>
          </div>
          {reqPatient.length === 0 && <p>لیست درخواست های شما خالی است</p>}
          {reqPatient.length > 0 && (
            <TableReqPatient
              reqPatient={reqPatient}
              setApointmentId={setApointmentId}
              apointmentId={apointmentId}
              setPageNumber={setPageNumber}
              setFlagUpload={setFlagUpload}
              flagUpload={flagUpload}
            />
          )}
        </div>
      )}
      {pageNumber === 1 && (
        <SelectServices
          setPageNumber={setPageNumber}
          valDoctor={valDoctor}
          setValDoctor={setValDoctor}
          service={service}
          setService={setService}
        />
      )}
      {pageNumber === 2 && <PatientListVisit setPageNumber={setPageNumber} />}
      {pageNumber === 3 && (
        <ProblemPatient
          setPageNumber={setPageNumber}
          valDoctor={valDoctor}
          service={service}
          setApointmentId={setApointmentId}
          flagUpload={flagUpload}
          setFlagUpload={setFlagUpload}
          account={account}
        />
      )}
      {pageNumber === 4 && (
        <UploadDocuments
          setPageNumber={setPageNumber}
          apointmentId={apointmentId}
          flagUpload={flagUpload}
          setFlagUpload={setFlagUpload}
          filesUpload={filesUpload}
        setFilesUpload={setFilesUpload}
        isShowImg={isShowImg}
        setIsShowImg={setIsShowImg}
        isShowAudio={isShowAudio}
        setIsShowAudio={setIsShowAudio}
        isShowVideo={isShowVideo}
        setIsShowVideo={setIsShowVideo}
        src={src}
        setSrc={setSrc}
        srcVideo={srcVideo}
        setSrcVideo={setSrcVideo}
        srcAudio={srcAudio}
        setSrcAudio={setSrcAudio}
        />
      )}
    </>
  );
}
