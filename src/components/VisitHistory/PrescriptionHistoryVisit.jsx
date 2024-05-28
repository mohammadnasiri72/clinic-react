import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { mainDomain } from '../../utils/mainDomain';

export default function PrescriptionHistoryVisit({receptionSelected , setIsLoading}) {
    const [listDrug, setListDrug] = useState([]);

    useEffect(() => {
        setIsLoading(true)
        axios
          .get(`${mainDomain}/api/Prescription/GetList`, {
            params: {
              appointmentId: receptionSelected.appointmentId,
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((res) => {
            setIsLoading(false)
            setListDrug(res.data);
          })
          .catch((err) => {
            setIsLoading(false)
          });
      }, [receptionSelected]);
  return (
    <>
   <div className='rounded-lg border-2'>
   <h3 className='text-teal-500 font-semibold'>جزئیات نسخه</h3>
              <span className="text-xs text-teal-400">تاریخ ویزیت : {receptionSelected.appointmentDateFA}</span>
              <hr className="my-2 border-dashed border" />
              {listDrug.map((e, i) => (
               <div key={e.prescriptionId} className='px-3'>
                 <div dir="ltr"  className="flex items-center rounded-lg bg-slate-50 mt-2 px-2">
                  <span>{i + 1}_</span>
                  <span className="px-1 text-sm">{e.medicationName}</span>
                  <span className="px-1 text-sm">{e.form}</span>
                  <span className="px-1 text-sm">{e.frequency}</span>
                  <span className="px-1 text-sm">{e.dosage}</span>
                </div>
               </div>
              ))}
   </div>
    </>
  )
}
