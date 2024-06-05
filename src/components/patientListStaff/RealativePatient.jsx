import { useState } from 'react';
import { Button } from '@mui/material';
import { FaPlus } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import SimpleBackdrop from '../backdrop';
import BoxRelative from './BoxRelative';


export default function RelativePatient({isOpenAccompanying  , setIsOpenAddRelative , setIsOpenAccompanying , PatientRelative , setEditRelative , setFlag}) {
    const [isLoading , setIsLoading] = useState(false)

    const addPatientRelativeHandler = ()=>{
        setIsOpenAddRelative(true)
        setEditRelative({})
    }
  return (
    <>
      <div
        style={{ zIndex: '1300', transform: isOpenAccompanying ? 'translateX(0)' : 'translateX(-100%)' }}
        className="fixed top-0 bottom-0 lg:right-2/3 sm:right-1/2 right-0 left-0 bg-slate-50 duration-500 p-5 shadow-lg overflow-y-auto"
      >
        <div className='text-start mb-3'>
        {/* <button onClick={()=>{
            setIsOpenAccompanying(false)
          }} className='bg-slate-200 rounded-full p-3 duration-300 hover:bg-slate-300'>
            <FaChevronRight style={{transform: isOpenAccompanying?'rotate(0deg)':'rotate(180deg)'}} className='text-xl text-slate-700'/>
          </button> */}
          <Button
            sx={{
              py: 2,
              boxShadow: 'none',
              // fontSize: 20,
              backgroundColor: 'rgb(100 116 139)',
              '&:hover': {
                backgroundColor: 'rgb(71 85 105)',
              },
            }}
            className="rounded-md duration-300 mt-2"
            onClick={()=>{
              setIsOpenAccompanying(false)
            }}
            variant="contained"
          >
            <FaChevronRight style={{transform: isOpenAccompanying?'rotate(0deg)':'rotate(180deg)'}} className='text-xl text-slate-700'/>
          </Button>
        </div>
        <div>
          {/* <button onClick={addPatientRelativeHandler} className="flex justify-center items-center bg-green-500 px-5 py-2 text-white rounded-md duration-300 hover:bg-green-600">
            <span className="px-2">افزودن همراه</span>
            <FaPlus />
          </button> */}
          <Button
            sx={{
              py: 2,
              boxShadow: 'none',
              // fontSize: 20,
              backgroundColor: 'rgb(16 185 129)',
              '&:hover': {
                backgroundColor: 'rgb(5 150 105)',
              },
            }}
            className="rounded-md duration-300 mt-2"
            onClick={addPatientRelativeHandler}
            variant="contained"
          >
            <span className="px-2">افزودن همراه</span>
            <FaPlus />
          </Button>
        </div>
        <div className="mt-3">
          <h3 className="text-xl font-semibold">لیست همراهان</h3>
        </div>
        {
            PatientRelative &&
            // <TableRelative PatientRelative={PatientRelative}/>
            <BoxRelative PatientRelative={PatientRelative} setIsLoading={setIsLoading} setIsOpenAddRelative={setIsOpenAddRelative} setEditRelative={setEditRelative} setFlag={setFlag}/>
        }
        {
            PatientRelative.length === 0 &&
            <p className='mt-5'>لیست همراهان خالی است</p>
        }
      </div>
      {
        isLoading && 
        <SimpleBackdrop />
      }
    </>
  );
}
