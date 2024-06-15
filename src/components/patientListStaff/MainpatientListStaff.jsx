import { Button, IconButton, Pagination, Stack, Tooltip, Typography } from '@mui/material';
import { FaArrowRight, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';
import { useEffect, useState } from 'react';
import SimpleBackdrop from '../backdrop';
import MainRegisterPage from '../register/mainRegisterPage';
import SecoundRegisterPage from '../register/secoundRegisterPage';
import FormUpdateProfile from '../updateProfile/formUpdateProfile';
import UploaderImage from '../updateProfile/uploaderImage';
import NavBarListPatient from './NavBarListPatient';
import TableListPatient from './TableListPatient';
import Reserve from '../reserve/reserve';
import MyReservation from '../myReservation/myReservation';
import FormHistoryVisit from '../VisitHistory/FormHistoryVisit';
import { mainDomain } from '../../utils/mainDomain';
import MainPageRegister from '../register/MainPageRegister';

export default function MainpatientListStaff({ changeStatePages }) {
  const [pageState, setPageState] = useState(0);
  const [accountUpdate, setAccountUpdate] = useState([]);
  const [isRegister, setIsRegister] = useState(false);
  const [registerModel, setRegisterModel] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [numPages, setNumPages] = useState(1);
  const [flag, setFlag] = useState(false);
  const [receptionSelected, setReceptionSelected] = useState({});
  const [patient, setPatient] = useState({});
  const [statusList, setStatusList] = useState([]);
  const [patientList, setPatientList] = useState([]);


  useEffect(()=>{
    setPageState(0)
  },[changeStatePages])

  // get status list
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${mainDomain}/api/Patient/GetStatusList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setStatusList(Object.values(res.data));
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div>
        {pageState === 0 && (
          <div>
            <NavBarListPatient
              setPageState={setPageState}
              setIsLoading={setIsLoading}
              patientList={patientList}
              setPatientList={setPatientList}
              numPages={numPages}
              setTotalPages={setTotalPages}
            />
            <div className="mt-5 w-11/12 mx-auto">
              <TableListPatient
                setPageState={setPageState}
                setAccountUpdate={setAccountUpdate}
                patient={patient}
                setPatient={setPatient}
                setReceptionSelected={setReceptionSelected}
                statusList={statusList}
                patientList={patientList}
                setPatientList={setPatientList}
                setNumPages={setNumPages}
                totalPages={totalPages}
              />
            </div>
          </div>
        )}
        {pageState === 1 && (
          <div>
            <div className="flex items-center">
              <Button
                size="small"
                sx={{
                  py: 1,
                  boxShadow: 'none',
                  // fontSize: 20,

                  backgroundColor: 'rgb(100 116 139)',
                  '&:hover': {
                    backgroundColor: 'rgb(71 85 105)',
                  },
                }}
                className="rounded-md duration-300 mt-2"
                onClick={() => {
                  setPageState(0);
                }}
                variant="contained"
              >
                <Tooltip title="برگشت به صفحه قبل">
                  <IconButton>
                    <FaChevronRight className="text-xl text-slate-100" />
                  </IconButton>
                </Tooltip>
              </Button>
              <Typography className="text-start px-3" variant="h3" component="h1" paragraph>
                ویرایش پروفایل
              </Typography>
            </div>
            <div className="flex justify-center flex-wrap">
              <div className="lg:w-1/3 w-full p-4">
                <UploaderImage account={accountUpdate} setPageState={setPageState} setChang={setFlag} patient />
              </div>
              <FormUpdateProfile account={accountUpdate} setPageState={setPageState} setChang={setFlag} patient />
            </div>
          </div>
        )}
        {pageState === 2 && (
          <div>
            <MainPageRegister setPageState={setPageState} pageState={pageState} />
          </div>
        )}
        {pageState === 3 && (
          <div>
            {accountUpdate && (
              <div className="flex">
                <div className="px-3">
                  {/* <button
                    onClick={() => setPageState(0)}
                    className="bg-blue-500 px-5 py-2 rounded-md duration-300 text-white hover:bg-blue-600 flex items-center"
                  >
                    <FaArrowRight />
                    <span className="px-2">برگشت به صفخه قبل</span>
                  </button> */}
                  <Button
                    sx={{
                      py: 2,
                      boxShadow: 'none',
                      // fontSize: 20,
                      backgroundColor: 'rgb(100 116 139)',
                      '&:hover': {
                        backgroundColor: 'rgb(71 85 105)',
                      },
                    }}
                    className="rounded-md duration-300 mt-2"
                    onClick={() => setPageState(0)}
                    variant="contained"
                  >
                    <FaArrowRight />
                    <span className="px-2">برگشت به صفخه قبل</span>
                  </Button>
                </div>
                <div>
                  {/* <button
                    onClick={() => setPageState(4)}
                    className="bg-slate-500 px-5 py-2 rounded-md duration-300 text-white hover:bg-slate-600 flex items-center"
                  >
                    <span className="px-2">مشاهده نوبت های بیمار</span>
                  </button> */}
                  <Button
                    sx={{
                      py: 2,
                      boxShadow: 'none',
                      // fontSize: 20,
                      backgroundColor: 'rgb(20 184 166)',
                      '&:hover': {
                        backgroundColor: 'rgb(13 148 136)',
                      },
                    }}
                    className="rounded-md duration-300 mt-2"
                    onClick={() => setPageState(4)}
                    variant="contained"
                  >
                    <span className="px-2">مشاهده نوبت های بیمار</span>
                  </Button>
                </div>
              </div>
            )}
            <Typography variant="h3" component="h1" paragraph>
              نوبت دهی آنلاین
            </Typography>
            <Reserve account={accountUpdate} setPageState={setPageState} />
          </div>
        )}
        {pageState === 4 && (
          <div>
            {accountUpdate && (
              <div className="px-3 mb-5">
                {/* <button
                  onClick={() => setPageState(0)}
                  className="bg-blue-500 px-5 py-2 rounded-md duration-300 text-white hover:bg-blue-600 flex items-center"
                >
                  <FaArrowRight />
                  <span className="px-2">برگشت به صفحه لیست بیماران</span>
                </button> */}
                <Button
                  sx={{
                    py: 2,
                    boxShadow: 'none',
                    // fontSize: 20,
                    backgroundColor: 'rgb(100 116 139)',
                    '&:hover': {
                      backgroundColor: 'rgb(71 85 105)',
                    },
                  }}
                  className="rounded-md duration-300 mt-2"
                  onClick={() => setPageState(0)}
                  variant="contained"
                >
                  <FaArrowRight />
                  <span className="px-2">برگشت به صفحه لیست بیماران</span>
                </Button>
              </div>
            )}
            <MyReservation account={accountUpdate} setPageState={setPageState} />
          </div>
        )}
        {pageState === 5 && (
          <FormHistoryVisit
            setPageState={setPageState}
            receptionSelected={receptionSelected}
            setIsLoading={setIsLoading}
            account={patient}
          />
        )}
      </div>
      {isLoading && <SimpleBackdrop />}
    </>
  );
}
