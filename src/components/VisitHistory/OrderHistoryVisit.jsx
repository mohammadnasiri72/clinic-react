import { Chip, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import { mainDomain } from '../../utils/mainDomain';

export default function OrderHistoryVisit({ receptionSelected, setIsLoading }) {
  const [listOrder, setListOrder] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${mainDomain} /api/MedicalRecord/Order/GetList`, {
        params: {
          appointmentId: receptionSelected.appointmentId,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setListOrder(res.data);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      <div>
        <h3 className="text-teal-500 font-semibold">اردر های پزشک</h3>
        {
        listOrder.length>0 &&
        listOrder.map((e, i) => (
          <div
            key={e.orderId}
            className="px-3 flex justify-between items-center rounded-lg hover:bg-slate-50 duration-300 mt-2"
          >
            <Chip label={e.status} variant="filled" color="warning" size="small" />
            <div className="px-1 w-full">
              <TextField
                disabled
                className="w-full"
                id="outlined-multiline-flexible"
                label="عنوان بیماری"
                multiline
                dir="rtl"
                value={e.medicalItemName}
                InputProps={{
                  startAdornment: <InputAdornment position="start">{i + 1}_</InputAdornment>,
                }}
              />
            </div>
            <div className="px-1 w-full">
              <TextField
                disabled
                className="w-full"
                id="outlined-multiline-flexible"
                label="توضیحات"
                multiline
                dir="rtl"
                value={e.doctorComments}
              />
            </div>
            <Tooltip title="دانلود فایل">
              <IconButton>
                <a target="_blank" rel="noreferrer" href={mainDomain} download>
                  <FaDownload className="text-lg" />
                </a>
              </IconButton>
            </Tooltip>
          </div>
        ))}
        {
           listOrder.length===0 &&
           <p className="text-sm mt-2">موردی ثبت نشده است</p>
        }
      </div>
    </>
  );
}
