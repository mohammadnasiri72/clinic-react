import { Button } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { mainDomain } from '../../utils/mainDomain'

export default function SelectCondition({setStatusId}) {
    const[statusList , setStatusList] = useState([])
    const[focus , setFocus] = useState(true)

    useEffect(()=>{
        axios.get(`${mainDomain}/api/Reservation/GetStatusList` , {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
        })
        .then((res)=>{
            setStatusList(Object.values(res.data));
        })
        .catch((err)=>{

        })
    },[])
  return (
    <>
    <div className="mt-3 rounded-md border p-2 flex justify-center items-center">
        <div className=" rounded-md">
          <Button
            onClick={() => setStatusId(-1)}
            color="info"
            onFocus={() => setFocus(true)}
            style={{ backgroundColor: focus ? 'rgb(226 232 240)' : 'transparent' }}
            className="focus:bg-slate-200"
          >
            <div className="px-2">
              <span>همه</span>
            </div>
            {/* <span className="w-8 h-8 bg-[#b0b0b0] text-white rounded-lg flex justify-center items-center">
              {receptions.length}
            </span> */}
          </Button>
        </div>
        {statusList.map((e, i) => (
          <div key={i} className="px-5 ">
            <Button color="info" 
            onFocus={()=> setFocus(false)}
            onClick={()=> setStatusId(i)} 
            className="focus:bg-slate-200" value={e}>
              <div className="px-2">
                <span>{e}</span>
              </div>
              {/* <span className="w-8 h-8 bg-[#b0b0b0] text-white rounded-lg flex justify-center items-center">
                {receptions.filter((rec) => rec.status === conditionList[i]).length}
              </span> */}
            </Button>
          </div>
        ))}
      </div>
    </>
  )
}