import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';

export default function TablePatientDoing({ patSelected, valType, setPageStateVisit, setIsLoading }) {
  const [listReception, setListReception] = useState([]);
  useEffect(() => {
    if (patSelected.patientNationalId) {
      setIsLoading(true);
      axios
        .get(`${mainDomain}/api/Appointment/GetList`, {
          params: {
            typeId: valType,
            patientNationalId: patSelected.patientNationalId,
            doctorMedicalSystemId: -1,
            fromPersianDate: '',
            toPersianDate: new Date().toLocaleDateString('fa-IR'),
            statusId: -1,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setIsLoading(false);
          setListReception(res.data);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  }, [patSelected, valType]);
  return (
    <>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="sticky table">
            <TableHead className="">
              <TableRow>
                <TableCell align="center">نام بیمار</TableCell>
                <TableCell align="center">کد ملی</TableCell>
                <TableCell align="center">تاریخ</TableCell>
                <TableCell align="center">عملیات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patSelected.patientFirstName && (
                <TableRow>
                  <TableCell align="center">
                    {patSelected.patientFirstName} {patSelected.patientLastName}
                  </TableCell>
                  <TableCell align="center">{patSelected.patientNationalId}</TableCell>
                  <TableCell align="center">امروز</TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => setPageStateVisit(1)}
                      variant="contained"
                      color="success"
                      className="text-white px-0"
                    >
                      ویزیت
                    </Button>
                  </TableCell>
                </TableRow>
              )}
              {listReception
                .filter((e) => e.statusId === 4)
                .sort((a, b) => Number(b.appointmentDateFA.slice(8, 10)) - Number(a.appointmentDateFA.slice(8, 10)))
                .map((e) => (
                  <TableRow key={e.appointmentId}>
                    <TableCell align="center">
                      {e.patientFirstName} {e.patientLastName}
                    </TableCell>
                    <TableCell align="center">{e.patientNationalId}</TableCell>
                    <TableCell align="center">{e.appointmentDateFA}</TableCell>
                    <TableCell align="center">
                      <Button variant="contained" color="inherit" className="text-white px-0">
                        جزئیات
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
