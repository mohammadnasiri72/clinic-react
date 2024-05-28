import { Autocomplete, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { mainDomain } from '../../utils/mainDomain';

export default function InputPatientList({
  pageStateReception,
  setUserSelected,
  patientList,
  setPatientList,
  userSelected,
  editeUser,
}) {
  useEffect(() => {
    if (!editeUser) {
      setUserSelected([]);
    }
    if (editeUser?.length>0) {
      setUserSelected(editeUser);
      
    }
  }, [pageStateReception]);
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
  const changValPatientHandler = (event, newValue) => {
    if (newValue) {
      setUserSelected(patientList.find((ev) => newValue.includes(ev.nationalId)));
    }
    if (!newValue) {
      setUserSelected([]);
    }
  };
  return (
    <>
      <div className="min-w-80">
        <Autocomplete
          value={
            userSelected.nationalId
              ? `${userSelected.firstName} ${userSelected.lastName} (  ${userSelected.nationalId} )`
              : ''
          }
          onChange={(event, newValue) => changValPatientHandler(event, newValue)}
          freeSolo
          options={patientList.map(
            (option) => `${option.firstName} ${option.lastName} ( ${option.nationalId} ) `
          )}
          renderInput={(params) => (
            <TextField {...params} label={pageStateReception === 0 ? 'لیست بیماران' : 'انتخاب بیمار'} />
          )}
        />
      </div>
    </>
  );
}
