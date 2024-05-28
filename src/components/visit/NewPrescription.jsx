import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { FaPlus } from 'react-icons/fa6';
import { mainDomain } from '../../utils/mainDomain';

export default function NewPrescription({ patSelected, setIsLoading, setFlag }) {
  const [categoryDrug, setCategoryDrug] = useState([]);
  const [valCategoryDrug, setValCategoryDrug] = useState([]);
  const [drugList, setDrugList] = useState([]);
  const [valDrugList, setValDrugList] = useState({});
  const [drugForm, setDrugForm] = useState([]);
  const [valDrugForm, setValDrugForm] = useState({});
  const [drugDose, setDrugDose] = useState([]);
  const [valDrugDose, setValDrugDose] = useState({});
  const [drugUseCycle, setDrugUseCycle] = useState([]);
  const [valDrugUseCycle, setValDrugUseCycle] = useState({});
  const [descDrug, setDescDrug] = useState('');

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  // Initialization description drug
  useEffect(() => {
    if (drugForm.length > 0 && valDrugList.defaultForm) {
      setValDrugForm(
        drugForm.find((e) => e.name === valDrugList.defaultForm)
          ? drugForm.find((e) => e.name === valDrugList.defaultForm)
          : {}
      );
    }
    if (drugDose.length > 0 && valDrugList.defaultDosage) {
      setValDrugDose(
        drugDose.find((e) => e.name === valDrugList.defaultDosage)
          ? drugDose.find((e) => e.name === valDrugList.defaultDosage)
          : {}
      );
    }
    if (drugUseCycle.length > 0 && valDrugList.defaultFrequency) {
      setValDrugUseCycle(
        drugUseCycle.find((e) => e.name === valDrugList.defaultFrequency)
          ? drugUseCycle.find((e) => e.name === valDrugList.defaultFrequency)
          : {}
      );
    }
    setDescDrug(valDrugList.description);
  }, [valDrugList, drugForm, drugDose, drugUseCycle]);

  // get description drug
  useEffect(() => {
    axios
      .get(`${mainDomain}/api/MedicationCategory/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setCategoryDrug(res.data);
      })
      .catch((err) => {});

    axios
      .get(`${mainDomain}/api/Medication/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setDrugList(res.data);
      })
      .catch((err) => {});

    axios
      .get(`${mainDomain}/api/BasicInfo/DrugForm/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setDrugForm(res.data);
      })
      .catch((err) => {});

    axios
      .get(`${mainDomain}/api/BasicInfo/DrugDose/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setDrugDose(res.data);
      })
      .catch((err) => {});

    axios
      .get(`${mainDomain}/api/BasicInfo/DrugUseCycle/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setDrugUseCycle(res.data);
      })
      .catch((err) => {});
  }, []);

  // set drug in prescription
  const setDrugHandler = () => {
    if (valDrugList.medicationId && valDrugForm.name && valDrugDose.name && valDrugUseCycle.name) {
      setIsLoading(true);
      const data = {
        appointmentId: patSelected.appointmentId,
        medicationId: valDrugList.medicationId,
        form: valDrugForm.name,
        dosage: valDrugDose.name,
        frequency: valDrugUseCycle.name,
        instructions: descDrug,
      };
      axios
        .post(`${mainDomain}/api/Prescription/Add`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setIsLoading(false);
          setFlag((e) => !e);
          setValDrugList({});
          setValCategoryDrug([]);
          setDescDrug('');
          setValDrugForm({});
          setValDrugDose({});
          setValDrugUseCycle({});
          Toast.fire({
            icon: 'success',
            text: 'دارو با موفقیت به نسخه اضافه شد',
          });
        })
        .catch((err) => {
          setIsLoading(false);
          Toast.fire({
            icon: 'error',
            text: err.response ? err.response.data : 'خطای شبکه',
          });
        });
    } else {
      Toast.fire({
        icon: 'error',
        text: 'لطفا مشخصات دارو را به درستی وارد کنید',
      });
    }
  };
  return (
    <>
      <div className="w-full">
        <FormControl color="primary" className="w-full">
          <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
            لیست دسته بندی دارو ها
          </InputLabel>
          <Select
            onChange={(e) => setValCategoryDrug(e.target.value)}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="لیست دسته بندی دارو ها"
            color="primary"
            value={valCategoryDrug}
          >
            {categoryDrug.map((e) => (
              <MenuItem key={e.medicationCategoryId} value={e.medicationCategoryId}>
                {e.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="w-full mt-5">
        <Autocomplete
          value={valDrugList}
          onChange={(event, newValue) => {
            if (newValue) {
              setValDrugList(newValue);
            } else {
              setValDrugList({});
            }
          }}
          freeSolo
          autoHighlight
          options={drugList.length > 0 ? drugList.filter((e) => e.medicalCategoryId === valCategoryDrug) : []}
          getOptionLabel={(option) => (option.name ? option.name : '')}
          renderInput={(params) => <TextField {...params} label={'لیست دارو ها'} placeholder="انتخاب دارو" />}
        />
      </div>
      <div className="w-full mt-5">
        <Autocomplete
          value={valDrugForm}
          onChange={(event, newValue) => setValDrugForm(newValue)}
          freeSolo
          autoHighlight
          options={drugForm}
          getOptionLabel={(option) => (option.name ? option.name : '')}
          renderInput={(params) => <TextField {...params} label={'شکل دارو ها'} placeholder="انتخاب شکل دارو" />}
        />
      </div>
      <div className="w-full mt-5">
        {/* <FormControl color="primary" className="w-full">
          <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
            دوز دارو ها
          </InputLabel>
          <Select
            onChange={(e) => setValDrugDose(e.target.value)}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="دوز دارو ها"
            color="primary"
            value={valDrugDose}
          >
            {drugDose.map((e) => (
              <MenuItem key={e.itemId} value={e.name}>
                {e.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
        <Autocomplete
          value={valDrugDose}
          onChange={(event, newValue) => setValDrugDose(newValue)}
          freeSolo
          autoHighlight
          options={drugDose}
          getOptionLabel={(option) => (option.name ? option.name : '')}
          renderInput={(params) => <TextField {...params} label={'دوز دارو ها'} placeholder="انتخاب دوز دارو" />}
        />
      </div>
      <div className="w-full mt-5">
        {/* <FormControl color="primary" className="w-full">
          <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
            چرخه مصرف
          </InputLabel>
          <Select
            onChange={(e) => setValDrugUseCycle(e.target.value)}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="چرخه مصرف"
            color="primary"
            value={valDrugUseCycle}
          >
            {drugUseCycle.map((e) => (
              <MenuItem key={e.itemId} value={e.name}>
                {e.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
        <Autocomplete
          value={valDrugUseCycle}
          onChange={(event, newValue) => setValDrugUseCycle(newValue)}
          freeSolo
          autoHighlight
          options={drugUseCycle}
          getOptionLabel={(option) => (option.name ? option.name : '')}
          renderInput={(params) => <TextField {...params} label={'چرخه مصرف'} placeholder="انتخاب چرخه مصرف" />}
        />
      </div>
      <div className="w-full text-start mt-5" dir="rtl">
        <TextField
          onChange={(e) => setDescDrug(e.target.value)}
          className="w-full text-end"
          id="outlined-multiline-flexible"
          label="توضیحات (دستور مصرف)"
          multiline
          dir="rtl"
          value={descDrug}
          minRows={4}
        />
      </div>
      <div className="pr-8 flex items-center mt-5">
        {/* <button
          onClick={setDrugHandler}
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
          onClick={setDrugHandler}
          variant="contained"
        >
          <span className="px-2">ثبت</span>
          <FaPlus />
        </Button>
      </div>
    </>
  );
}
