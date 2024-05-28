import { IconButton, Tooltip } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { MdDoNotDisturbOn } from 'react-icons/md';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';
import Iconify from '../Iconify';
import SimpleBackdrop from '../backdrop';
import AddPatientPopUp from './AddPatientPopUp';

export default function TablePatient({ isOpenAddPatient, infoPat }) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });
  const [listPatient, setListPatient] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [openEditPatient, setOpenEditPatient] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [isPatientActive, setIsPatientActive] = useState('true');
  const [medicationIdList, setMedicationIdList] = useState([]);
  const [desc, setDesc] = useState('');
  const [valueMedicine, setValueMedicine] = useState([]);
  const [patId, setPatId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (openEditPatient) {
      document.body.style.overflowY = 'hidden';
    } else if (!openEditPatient) {
      document.body.style.overflowY = 'auto';
    }
  }, [openEditPatient]);
  useEffect(() => {
    if (isOpenAddPatient) {
      document.body.style.overflowY = 'hidden';
    } else if (!isOpenAddPatient) {
      document.body.style.overflowY = 'auto';
    }
  }, [isOpenAddPatient]);
  useEffect(() => {
    if (!infoPat) {
      axios
        .get(`${mainDomain}/api/PatientHistory/GetList`, {
          params: {
            statusId: -1,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setListPatient(res.data);
        })
        .catch((err) => {});
    } else if (infoPat.nationalId) {
      axios
        .get(`${mainDomain}/api/PatientHistory/GetListByPatient`, {
          params: {
            statusId: -1,
            nationalId: infoPat.nationalId,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setListPatient(res.data);
        })
        .catch((err) => {});
    }

    axios
      .get(`${mainDomain}/api/Medication/GetList`, {
        params: {
          categoryId: -1,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setMedicines(res.data);
      })
      .catch((err) => {});
  }, [isOpenAddPatient, openEditPatient, isLoading, infoPat]);
  const editPatientHandler = (e) => {
    setOpenEditPatient(!openEditPatient);
    setPatientName(e.title);
    setAge(e.age);
    if (e.statusId === 0) {
      setIsPatientActive('false');
    } else if (e.statusId === 1) {
      setIsPatientActive('true');
    }
    setDesc(e.description);
    const arr = [];
    e.medicationIdList.map((ev) => {
      arr.push(medicines.find((med) => med.medicationId === ev));
      return true
    });
    setValueMedicine(arr);
    setPatId(e.patientHistoryId);
  };
  const deletePatientHandler = (e) => {
    Swal.fire({
      title: '',
      text: 'آیا از ثبت درخواست خود مطمئن هستید؟',

      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      cancelButtonText: 'انصراف',
      confirmButtonText: 'حذف بیماری',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const dataDelete = new FormData();
        dataDelete.append('patientHistoryId', e.patientHistoryId);
        axios
          .post(`${mainDomain}/api/PatientHistory/Delete`, dataDelete, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((res) => {
            setIsLoading(false);
            Toast.fire({
              icon: 'success',
              text: 'بیماری با موفقیت حذف شد',
            });
          })
          .catch((err) => {
            setIsLoading(false);
          });
      }
    });
  };
  return (
    <div>
      {infoPat && <h3 className="my-3 font-semibold">لیست بیماریهای بیمار</h3>}
      {listPatient.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="sticky table">
            <TableHead className="">
              <TableRow>
                <TableCell>عنوان بیماری</TableCell>
                <TableCell align="center">سن ابتلا</TableCell>
                <TableCell align="center">وضعیت بیماری</TableCell>
                <TableCell align="center">داروهای مورد استفاده</TableCell>
                <TableCell align="center">توضیحات</TableCell>
                <TableCell align="center">عملیات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow className="h-3" />
              {listPatient.map((pat) => (
                <TableRow
                  className="hover:bg-[#f4f6f8] duration-300"
                  key={pat.patientHistoryId}
                  sx={{
                    borderBottom: 'dotted #0001',
                    borderBottomWidth: '2px',
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {pat.title}
                  </TableCell>
                  <TableCell align="center">{pat.age}</TableCell>
                  <TableCell align="center">{pat.statusId === 0 ? 'بهبود یافته' : 'درگیر'}</TableCell>
                  <TableCell align="center">
                    <div>
                      {pat.medicationIdList.map((e, i) => (
                        <p className="mt-1 p-1 bg-slate-200 rounded-3xl" key={i}>
                          {medicines.length > 0 && medicines.find((ev) => ev.medicationId === e).name}
                        </p>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell align="center">{pat.description}</TableCell>
                  <TableCell align="center">
                    {!infoPat && (
                      <div className="flex justify-around">
                        <Tooltip title="ویرایش">
                          <IconButton>
                            <Iconify onClick={() => editPatientHandler(pat)} icon={'eva:edit-fill'} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="حذف">
                          <IconButton>
                            <Iconify
                              className="text-red-500"
                              onClick={() => deletePatientHandler(pat)}
                              icon={'eva:trash-2-outline'}
                            />
                          </IconButton>
                        </Tooltip>
                      </div>
                    )}
                    {infoPat && (
                      <div className="flex justify-center">
                        <MdDoNotDisturbOn className="text-2xl" />
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {listPatient.length === 0 && <p className="pb-3">لیست بیماریهای شما خالی است</p>}
      <AddPatientPopUp
        isOpenAddPatient={openEditPatient}
        setIsOpenAddPatient={setOpenEditPatient}
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
        patId={patId}
      />
      {isLoading && <SimpleBackdrop />}
    </div>
  );
}
