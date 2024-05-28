import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';

export default function SelectServicesNotPersonal({service , setService}) {
  const [services, setServices] = useState([]);
  
  useEffect(() => {
    axios
      .get(`${mainDomain}/api/MedicalService/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setServices(res.data);
        setService(res.data[0].medicalServiceId)
      })
      .catch((err) => {});
  }, []);
  return (
    <>
      <div className=" mx-auto flex items-center mt-5">
        <div className="px-4 w-full" dir="rtl">
          <FormControl color="primary" className="w-full">
            <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
              لیست خدمات غیر حضوری
            </InputLabel>
            <Select
              onChange={(e) => setService(e.target.value)}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="لیست خدمات غیر حضوری"
              color="primary"
              value={service}
            >
              {services.map((e) => (
                <MenuItem key={e.medicalServiceId} value={e.medicalServiceId}>
                  {e.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </>
  );
}
