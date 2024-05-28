import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';
import SimpleBackdrop from '../backdrop';
import OperationMenu from './OperationMenu';

export default function TableReqPatient({ setPageState, setAccountUpdate , searchValue}) {
  const [patientList, setPatientList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [flag, setFlag] = useState(false);

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
  }, [flag]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ردیف</TableCell>
              <TableCell>نام و نام خانوادگی</TableCell>
              <TableCell align="center">نام پدر</TableCell>
              <TableCell align="center">کد ملی</TableCell>
              <TableCell align="center">جنسیت</TableCell>
              <TableCell align="center">موبایل</TableCell>
              <TableCell align="center">جزئیات</TableCell>
              <TableCell align="center">عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patientList.filter((ev)=> ev.firstName.includes(searchValue) || ev.lastName.includes(searchValue) || ev.nationalId.includes(searchValue)).map((pat, index) => (
              <TableRow key={pat.patientId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <span className="pr-2 font-semibold">{index + 1}</span>
                </TableCell>
                <TableCell component="th" scope="pat">
                  {pat.firstName} {pat.lastName}
                </TableCell>
                <TableCell align="center">{pat.fatherName}</TableCell>
                <TableCell align="center">{pat.nationalId}</TableCell>
                <TableCell align="center">{pat.gender === 'm' ? 'مرد' : 'زن'}</TableCell>
                <TableCell align="center">{pat.abroad ? pat.userEmail : pat.userPhoneNumber}</TableCell>
                <TableCell align="center">
                  <div className="flex justify-center">
                    {/* < className="cursor-pointer" /> */}
                  </div>
                </TableCell>
                <TableCell align="center">
                  <OperationMenu
                    setPageState={setPageState}
                    setAccountUpdate={setAccountUpdate}
                    pat={pat}
                    setIsLoading={setIsLoading}
                    setFlag={setFlag}
                    flag={flag}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {isLoading && <SimpleBackdrop />}
    </>
  );
}
