import { Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';
import CheckBoxHandler from './CheckBoxHandler';

export default function CheckBoxDoctor({ valCondition, setValCondition, medicalRecord , disabledChechBox}) {
  const [conditionPatient, setConditionPatient] = useState([]);
  useEffect(()=>{
    const arr = []
    medicalRecord.map((e)=>{
      arr.push(e.medicalItemId)
      return true
    })
    setValCondition(arr);
  },[medicalRecord])
  
  useEffect(() => {
    axios
      .get(`${mainDomain}/api/BasicInfo/PatientStatusAdmission/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setConditionPatient(res.data);
      })
      .catch((err) => {});
  }, []);
  const changConditionHandler = (e) => {
    
    if (valCondition.includes(Number(e.itemId))) {
      setValCondition(valCondition.filter((event) => event !== Number(e.itemId)));
    } else {
      setValCondition([...new Set([...valCondition, Number(e.itemId)])]);
    }
  };
  return (
    <>
      <div className="mt-4 flex justify-start items-center">
        <h3 className="px-4 whitespace-nowrap">وضعیت هنگام پذیرش:</h3>
        {conditionPatient
          .filter((e)=> e.isActive)
          .map((e, i) => (
            <CheckBoxHandler key={e.itemId} e={e} changConditionHandler={changConditionHandler} medicalRecord={medicalRecord} disabledChechBox={disabledChechBox}/>
          ))}
      </div>
    </>
  );
}
