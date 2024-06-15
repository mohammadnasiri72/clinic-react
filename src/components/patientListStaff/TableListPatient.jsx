import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { Pagination, Skeleton, Stack } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';
import OperationMenu from './OperationMenu';
import SelectStatus from './SelectStatus';
import SimpleBackdrop from '../backdrop';

export default function TableReqPatient({
  setPageState,
  setAccountUpdate,
  
  patient,
  setPatient,
  setReceptionSelected,
  statusList,
  patientList,
  setPatientList,
  setNumPages,
totalPages
}) {
  const [flag, setFlag] = useState(false);
  
  const [PatientRelative, setPatientRelative] = useState([]);
  const [isOpenAccompanying, setIsOpenAccompanying] = useState(false);
  const [isOpenAddRelative, setIsOpenAddRelative] = useState(false);
  const [historyReception, setHistoryReception] = useState([]);

  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (patient.nationalId) {
      setIsLoading(true)
      axios
        .get(`${mainDomain}/api/PatientRelative/Patient/GetList`, {
          params: {
            nationalId: patient.nationalId,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setPatientRelative(res.data);
          setIsLoading(false)
        })
        .catch((err) => {
          setIsLoading(false)
        });
    }
  }, [patient, isOpenAccompanying, isOpenAddRelative, flag]);

  // get list patient
  // useEffect(() => {
  //   setIsLoading(true);
  //   axios
  //     .get(`${mainDomain}/api/Patient/GetListPaged`, {
  //       params:{
  //         pageIndex: numPages
  //       },
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       },
  //     })
  //     .then((res) => {
  //       setIsLoading(false);
  //       setPatientList(res.data.items);
  //       setTotalPages(res.data.totalPages)
  //     })
  //     .catch((err) => {
  //       setIsLoading(false);
  //     });
  // }, [flag]);

  useEffect(() => {
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
  }, [patient]);

  
  return (
    <>
      {
      // patientList
      // .filter(
      //   (ev) =>
      //   (ev.firstName.includes(searchValue) ||
      //       ev.lastName.includes(searchValue) ||
      //       ev.nationalId.includes(searchValue))
            
      //       &&
            
      //      ( ev.status === valStatusFilter ||
      //     valStatusFilter === 'همه')
      // ).length > 0 && 
      (
        <div>
          <TableContainer className="mb-20" component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ردیف</TableCell>
                  <TableCell>نام و نام خانوادگی</TableCell>
                  <TableCell align="center">نام پدر</TableCell>
                  <TableCell align="center">کد ملی</TableCell>
                  <TableCell align="center">شماره پرونده</TableCell>
                  <TableCell align="center">جنسیت</TableCell>
                  <TableCell align="center">موبایل</TableCell>
                  <TableCell align="center">وضعیت</TableCell>
                  <TableCell align="center">عملیات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patientList.length>0 &&
                 patientList
                //  .filter(
                //   (ev) =>
                //   (ev.firstName.includes(searchValue) ||
                //       ev.lastName.includes(searchValue) ||
                //       ev.nationalId.includes(searchValue))
                      
                //       &&
                      
                //      ( ev.status === valStatusFilter ||
                //     valStatusFilter === 'همه')
                // )
                  .map((pat, index) => (
                    <TableRow key={pat.patientId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell>
                        <span className="pr-2 font-semibold">{index + 1}</span>
                      </TableCell>
                      <TableCell component="th" scope="pat">
                        {pat.firstName} {pat.lastName}
                      </TableCell>
                      <TableCell align="center">{pat.fatherName}</TableCell>
                      <TableCell align="center">{pat.nationalId}</TableCell>
                      <TableCell align="center">{pat.fileNumber}</TableCell>
                      <TableCell align="center">{pat.gender === 'm' ? 'مرد' : 'زن'}</TableCell>
                      <TableCell align="center">{pat.abroad ? pat.userEmail : pat.userPhoneNumber}</TableCell>
                      <TableCell align="center">
                        <SelectStatus pat={pat} setIsLoading={setIsLoading} statusList={statusList} />
                      </TableCell>
                      <TableCell align="center">
                        <OperationMenu
                          setPageState={setPageState}
                          setAccountUpdate={setAccountUpdate}
                          pat={pat}
                          isLoading={isLoading}
                          setIsLoading={setIsLoading}
                          setFlag={setFlag}
                          patient={patient}
                          setPatient={setPatient}
                          setReceptionSelected={setReceptionSelected}
                          PatientRelative={PatientRelative}
                          isOpenAccompanying={isOpenAccompanying}
                          setIsOpenAccompanying={setIsOpenAccompanying}
                          isOpenAddRelative={isOpenAddRelative}
                          setIsOpenAddRelative={setIsOpenAddRelative}
                          historyReception={historyReception}
                          setPatientRelative={setPatientRelative}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="flex justify-center">
            <Stack spacing={2}>
              <Pagination onChange={(e , value) => setNumPages(value)} count={totalPages} />
            </Stack>
          </div>
        </div>
      )}
      {patientList
      .length === 0 &&
        !isLoading && <p className="border p-3 rounded-lg">بیماری یافت نشد</p>}
      {patientList.length === 0 &&
        isLoading && (
          <div className="w-full">
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
          </div>
        )}
      {isLoading && <SimpleBackdrop />}
    </>
  );
}
