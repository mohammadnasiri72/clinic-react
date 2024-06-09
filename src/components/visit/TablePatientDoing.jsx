import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';

export default function TablePatientDoing({
  patSelected,
  valType,
  setPageStateVisit,
  setIsLoading,
  setPageStateVisitHistory,
  setAccount,
  setReceptionSelected,
}) {
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

  const showDetailsHandler = (e)=>{
    setPageStateVisitHistory(1);
    setReceptionSelected(e);
    axios.get(`${mainDomain}/api/Patient/GetList` , {
      params:{
        query: e.patientNationalId
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((res)=>[
      setAccount(res.data[0])
    ])
    .catch((err)=>{

    })
  }
  return (
    <>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650  , position:'relative'}} aria-label="sticky table">
            <TableHead className="">
              <TableRow>
                <TableCell align="center">نام بیمار</TableCell>
                <TableCell align="center">کد ملی</TableCell>
                <TableCell align="center">تاریخ</TableCell>
                <TableCell align="center">عملیات</TableCell>
              </TableRow>
            </TableHead>
            {
              patSelected.patientNationalId &&
            <TableBody>
              {patSelected.patientNationalId && (
                <TableRow>
                  <TableCell align="center">
                    {patSelected.patientFirstName} {patSelected.patientLastName}
                  </TableCell>
                  <TableCell align="center">{patSelected.patientNationalId}</TableCell>
                  <TableCell align="center">{patSelected.appointmentDateFA}</TableCell>
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
              <div className='absolute left-0 right-0'>
                <hr />
                <p className='font-semibold text-teal-500'>تاریخچه ویزیت های بیمار</p>
              </div>
              <div className='h-5'/>
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
                      <Button
                        onClick={()=> showDetailsHandler(e)}
                        variant="contained"
                        color="inherit"
                        className="text-white px-0"
                      >
                        جزئیات
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            }
            
          </Table>
        </TableContainer>
      </div>
      {
        !patSelected.patientNationalId &&
        <div className='mt-4'>لطفا ابتدا بیمار را انتخاب کنید</div>
      }
    </>
  );
}
