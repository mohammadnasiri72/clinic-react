import { Button, IconButton, Skeleton, TextField, Tooltip } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { FaRegTrashCan } from 'react-icons/fa6';
import { MdDoNotDisturbOn } from 'react-icons/md';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';
import Iconify from '../Iconify';
import SimpleBackdrop from '../backdrop';
import AddPatientPopUp from './AddPatientPopUp';

export default function TablePatient({ isOpenAddPatient, infoPat, isLoading, setIsLoading }) {
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
      setIsLoading(true);
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
          setIsLoading(false);
          setListPatient(res.data);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    } else if (infoPat.nationalId) {
      setIsLoading(true);
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
          setIsLoading(false);
          setListPatient(res.data);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  }, [isOpenAddPatient, openEditPatient, infoPat]);
  useEffect(() => {
    setIsLoading(true);
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
        setIsLoading(false);
        setMedicines(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);
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
      return true;
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
    <>
      <div>
        {infoPat && <h3 className="my-3 font-semibold">لیست بیماریهای بیمار</h3>}
        {listPatient.length > 0 && (
          <div className="md:block hidden">
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
                              <IconButton onClick={() => editPatientHandler(pat)}>
                                <Iconify icon={'eva:edit-fill'} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="حذف">
                              <IconButton onClick={() => deletePatientHandler(pat)}>
                                <Iconify className="text-red-500" icon={'eva:trash-2-outline'} />
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
          </div>
        )}
        {listPatient.length === 0 && !isLoading && <p className="pb-3">لیست بیماریهای شما خالی است</p>}
        {listPatient.length === 0 && isLoading && (
          <div className="w-11/12 mx-auto">
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
          </div>
        )}
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
      </div>
      <div className="md:hidden block">
        <div className="flex flex-wrap justify-around pb-2">
          {listPatient.map((pat) => (
            <div key={pat.patientHistoryId} className="border rounded-2xl bg-slate-50 p-3 sm:w-5/12 w-full mt-2">
              <div className="mt-3 w-52 mx-auto">
                <TextField
                  aria-readonly
                  className=" text-end"
                  id="outlined-multiline-flexible"
                  label="عنوان بیماری"
                  dir="rtl"
                  value={pat.title}
                />
              </div>
              <div className="mt-3 w-52 mx-auto">
                <TextField
                  aria-readonly
                  className="text-end"
                  id="outlined-multiline-flexible"
                  label="سن ابتلا"
                  dir="rtl"
                  value={pat.age}
                />
              </div>
              <div className="mt-3 w-52 mx-auto">
                <TextField
                  aria-readonly
                  className="text-end"
                  id="outlined-multiline-flexible"
                  label="وضعیت ابتلا"
                  dir="rtl"
                  value={pat.statusId === 0 ? 'بهبود یافته' : 'درگیر'}
                />
              </div>
              {pat.medicationIdList.length > 0 && (
                <div className="w-52 mx-auto flex flex-col items-center border mt-3 p-3 rounded-xl ">
                  <div className="text-start w-full">
                    <h6 className="">داروهای مورد استفاده</h6>
                  </div>
                  {pat.medicationIdList.map((e, i) => (
                    <p className="mt-1 px-5 bg-slate-200 rounded-3xl" key={i}>
                      {medicines.length > 0 && medicines.find((ev) => ev.medicationId === e).name}
                    </p>
                  ))}
                </div>
              )}
              <div className="mt-3 w-52 mx-auto">
                <TextField
                  aria-readonly
                  className="text-end"
                  id="outlined-multiline-flexible"
                  label="توضیحات"
                  dir="rtl"
                  multiline
                  value={pat.description}
                />
              </div>
              <div className="flex justify-center mt-5">
                <Button onClick={() => deletePatientHandler(pat)} className="flex items-center">
                  <FaRegTrashCan className="text-red-500 text-2xl" />
                  <span className="text-red-500 px-1">حذف</span>
                </Button>
                <Button onClick={() => editPatientHandler(pat)} className="flex items-center">
                  <Iconify className="text-teal-500 text-2xl" icon={'eva:edit-fill'} />
                  <span className="text-teal-500 px-1">ویرایش</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
