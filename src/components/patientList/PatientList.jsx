import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { Button } from '@mui/material';
import TablePatient from './TablePatient';
import AddPatientPopUp from './AddPatientPopUp';
import SimpleBackdrop from '../backdrop';

export default function PatientList() {
  const [isOpenAddPatient, setIsOpenAddPatient] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [isPatientActive, setIsPatientActive] = useState('true');
  const [medicationIdList, setMedicationIdList] = useState([]);
  const [desc, setDesc] = useState('');
  const [valueMedicine, setValueMedicine] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div>
        <div className="w-11/12 border rounded-md">
          <h3 className="bg-[#f4f6f8] rounded-t-md font-semibold text-xl text-gray-600 p-2">لیست بیماریهای من</h3>
          <div className="text-start p-3">
            <Button
              sx={{
                py: 1,
                boxShadow: 'none',
                backgroundColor: 'rgb(16 185 129)',
                '&:hover': {
                  backgroundColor: 'rgb(5 150 105)',
                },
              }}
              className="p-2 rounded-md duration-300 mt-2"
              onClick={() => setIsOpenAddPatient(!isOpenAddPatient)}
              variant="contained"
            >
              <span className="px-2">ثبت بیماری جدید</span>
              <FaPlus />
            </Button>
          </div>

          <div>
            <TablePatient isOpenAddPatient={isOpenAddPatient} isLoading={isLoading} setIsLoading={setIsLoading} />
          </div>
        </div>
        <AddPatientPopUp
          isOpenAddPatient={isOpenAddPatient}
          setIsOpenAddPatient={setIsOpenAddPatient}
          patientName={patientName}
          setPatientName={setPatientName}
          age={age}
          setAge={setAge}
          isPatientActive={isPatientActive}
          setIsPatientActive={setIsPatientActive}
          medicationIdList={medicationIdList}
          setMedicationIdList={setMedicationIdList}
          desc={desc}
          setDesc={setDesc}
          valueMedicine={valueMedicine}
          setValueMedicine={setValueMedicine}
        />
      </div>
      {isLoading && <SimpleBackdrop />}
    </>
  );
}
