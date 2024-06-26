/* eslint-disable no-nested-ternary */
import { Autocomplete, Box, CircularProgress, InputAdornment, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';

export default function InputPatientList({
  pageStateReception,
  setUserSelected,
  patientList,
  setPatientList,
  userSelected,
  editeUser,
  query,
  setQuery,
}) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // if (!editeUser) {
    //   setUserSelected({});
    // }
    if (editeUser?.patientNationalId) {
      axios
        .get(`${mainDomain}/api/Patient/GetList`, {
          params: {
            query: editeUser.patientNationalId,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setUserSelected(res.data[0]);
        })
        .catch((err) => {});
    }
  }, [pageStateReception]);

  useEffect(() => {
    if (query.length > 2) {
      setLoading(true);
      axios
        .get(`${mainDomain}/api/Patient/GetList`, {
          params: {
            query,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setPatientList(res.data);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      setPatientList([]);
    }
  }, [query]);

  const changValPatientHandler = (event, newValue) => {
    if (newValue) {
      if (patientList.find((ev) => newValue.includes(ev.nationalId))) {
        setUserSelected(patientList.find((ev) => newValue.includes(ev.nationalId)));
      } else {
        setUserSelected([]);
      }
    } else {
      setUserSelected([]);
    }
  };
  return (
    <>
      <div className="min-w-80">
        <Autocomplete
          loading={query.length > 2}
          value={
            userSelected.nationalId
              ? `${userSelected.firstName} ${userSelected.lastName} (  ${userSelected.nationalId} )`
              : ''
          }
          onChange={(event, newValue) => changValPatientHandler(event, newValue)}
          freeSolo
          options={patientList.map((option) => `${option.firstName} ${option.lastName} ( ${option.nationalId} ) `)}
          renderInput={(params) => (
            <TextField
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              {...params}
              label={pageStateReception === 0 ? 'لیست بیماران' : 'انتخاب بیمار'}
            />
          )}
        />
      </div>
    </>
  );
}
