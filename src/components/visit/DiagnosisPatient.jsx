import { Autocomplete, Button, Stack, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';
import AddNewItem from './AddNewItem';
import TableDiagnosisPatient from './TableDiagnosisPatient';

export default function DiagnosisPatient({ patSelected, setIsLoading }) {
  const [alignment, setAlignment] = useState('Problem');
  const [diagnosisList, setDiagnosisList] = useState([]);
  const [valDiagnosis, setValDiagnosis] = useState([]);
  const [valProblem, setValProblem] = useState([]);
  const [problemList, setProblemList] = useState([]);
  const [adviceList, setAdviceList] = useState([]);
  const [valAdvice, setValAdvice] = useState([]);
  const [medicalRecord, setMedicalRecord] = useState([]);
  const [flag, setFlag] = useState(false);
  const [typeId, settypeId] = useState('');
  const [medicalItemId, setMedicalItemId] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [optionsAuto, setOptionsAuto] = useState([]);
  const [label, setLabel] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [medicalCategoryId, setMedicalCategoryId] = useState('');

  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  // get list problem patient
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${mainDomain}/api/BasicInfo/PatientComplaints/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setProblemList(res.data);
        
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [alignment , flag]);
  // get list diagnosis
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${mainDomain}/api/BasicInfo/DoctorDiagnoses/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setDiagnosisList(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [alignment , flag]);
  // get list Advice
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${mainDomain}/api/BasicInfo/DoctorRecommendations/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setAdviceList(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [alignment , flag]);

  // get medicalrecoard
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${mainDomain}/api/MedicalRecord/GetList`, {
        params: {
          appointmentId: patSelected.appointmentId,
          typeId: -1,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setMedicalRecord(res.data);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [flag , alignment]);

  useEffect(() => {
    if (alignment === 'Problem') {
      settypeId(2)
      setMedicalItemId(valProblem.itemId)
      setValue(valProblem) 
      setOptionsAuto(problemList) 
      setLabel('مشکلات بیمار') 
      setPlaceholder('انتخاب عارضه') 
      if (problemList.length>0) {
        setMedicalCategoryId(problemList[0].medicalCategoryId)
      }
    }
     if (alignment === 'Diagnosis') {
      settypeId(3)
      setMedicalItemId(valDiagnosis.itemId)
      setValue(valDiagnosis)
      setOptionsAuto(diagnosisList)
      setLabel('تشخیص ها')
      setPlaceholder('انتخاب تشخیص') 
      if (diagnosisList.length>0) {
        setMedicalCategoryId(diagnosisList[0].medicalCategoryId)
      }
    } 
    if (alignment === 'Advice')  {
      settypeId(4)
      setMedicalItemId(valAdvice.itemId)
      setValue(valAdvice)
      setOptionsAuto(adviceList)
      setLabel('توصیه ها')
      setPlaceholder('انتخاب توصیه')
      if (adviceList.length>0) {
        setMedicalCategoryId(adviceList[0].medicalCategoryId)
      }
    }
  }, [alignment , problemList , diagnosisList , adviceList , valProblem , valDiagnosis , valAdvice]);
  const setItemHandler = () => {
    setIsLoading(true);
    const data = {
      appointmentId: patSelected.appointmentId,
      typeId,
      medicalItemId,
      description,
    };
    axios
      .post(`${mainDomain}/api/MedicalRecord/Add`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setFlag((e) => !e);
        setIsLoading(false);
        setDescription('');
        setValProblem([]);
        setValDiagnosis([]);
        setValAdvice([]);
        Toast.fire({
          icon: 'success',
          text: 'با موفقیت ثبت شد',
        });
      })
      .catch((err) => {
        setIsLoading(false);
        Toast.fire({
          icon: 'error',
          text: err.response ? err.response.data : 'خطای شبکه',
        });
      });
  };
  // const setDiagnosisHandler = () => {
  //   setIsLoading(true);
  //   const data = {
  //     appointmentId: patSelected.appointmentId,
  //     typeId: 3,
  //     medicalItemId: valDiagnosis,
  //     description: descDiagnosis,
  //   };
  //   axios
  //     .post(`${mainDomain}/api/MedicalRecord/Add`, data, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       },
  //     })
  //     .then((res) => {
  //       setIsLoading(false);
  //       setFlag((e) => !e);
  //       setDescDiagnosis('');
  //       setValDiagnosis([]);
  //       Toast.fire({
  //         icon: 'success',
  //         text: 'مشکل با موفقیت ثبت شد',
  //       });
  //     })
  //     .catch((err) => {
  //       setIsLoading(false);
  //       Toast.fire({
  //         icon: 'error',
  //         text: err.response ? err.response.data : 'خطای شبکه',
  //       });
  //     });
  // };

  const changeValue = (newValue) => {
    if (alignment === 'Problem') {
      setValProblem(newValue);
    } else if (alignment === 'Diagnosis') {
      setValDiagnosis(newValue);
    } else {
      setValAdvice(newValue);
    }
  };
  
  return (
    <>
      <div className="text-start -mt-5">
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={(event, newEvent) => {
            if (newEvent !== null) {
              setAlignment(newEvent);
            }
          }}
          aria-label="Platform"
        >
          <ToggleButton value="Problem">مشکل بیمار</ToggleButton>
          <ToggleButton value="Diagnosis">تشخیص</ToggleButton>
          <ToggleButton value="Advice">توصیه</ToggleButton>
        </ToggleButtonGroup>
      </div>
      {
        <div>
          <div className="flex mt-5">
            <div className="pr-4">
              <AddNewItem setIsLoading={setIsLoading} medicalCategoryId={medicalCategoryId} setFlag={setFlag}/>
            </div>
            <div className="w-80 pr-4" dir="rtl">
              <Stack spacing={3}>
                <Autocomplete
                  value={value}
                  onChange={(event, newValue) => {
                    changeValue(newValue);
                    // alignment === 'Problem'
                    //   ? setValProblem(newValue)
                    //   : alignment === 'Diagnosis'
                    //   ? setValDiagnosis(newValue)
                    //   : setValAdvice(newValue);
                  }}
                  id="tags-outlined"
                  options={optionsAuto}
                  getOptionLabel={(option) => (option.name ? option.name : '')}
                  filterSelectedOptions
                  renderInput={(params) => <TextField {...params} label={label} placeholder={placeholder} />}
                />
              </Stack>
            </div>
            <div className="w-80 text-start pr-4" dir="rtl">
              <TextField
                onChange={(e) => {
                  // changeValueTextField(e);
                  setDescription(e.target.value)
                  // alignment === 'Problem'
                  //   ? setDescProblem(e.target.value)
                  //   : alignment === 'Diagnosis'
                  //   ? setDescDiagnosis(e.target.value)
                  //   : setDescAdvice(e.target.value);
                }}
                className="w-80 text-end"
                id="outlined-multiline-flexible"
                label="توضیحات"
                multiline
                dir="rtl"
                value={description}
              />
            </div>
            <div className="pr-8 flex items-center">
              {/* <button
                onClick={setItemHandler}
                className="px-5 py-4 rounded-lg bg-green-500 duration-300 hover:bg-green-600 text-white flex items-center"
              >
                <span className="px-2">ثبت</span>
                <FaPlus />
              </button> */}
              <Button
                sx={{
                  py: 1,
                  boxShadow: 'none',
                  // fontSize: 20,
                  backgroundColor: 'rgb(16 185 129)',
                  '&:hover': {
                    backgroundColor: 'rgb(5 150 105)',
                  },
                }}
                className="p-2 rounded-md duration-300 mt-2 w-28"
                onClick={setItemHandler}
                variant="contained"
              >
                <span className="px-2">ثبت</span>
                <FaPlus />
              </Button>
            </div>
          </div>
          <TableDiagnosisPatient
            medicalRecord={medicalRecord}
            setIsLoading={setIsLoading}
            setFlag={setFlag}
            alignment={alignment}
          />
        </div>
      }
    </>
  );
}
