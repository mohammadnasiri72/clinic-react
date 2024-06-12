/* eslint-disable no-undef */
import { Button } from '@mui/material';
import { FaChevronRight } from 'react-icons/fa';
import BoxReceptionPatient from '../VisitHistory/BoxReceptionPatient';
import UserCard from './UserCard';

export default function DetailsPatient({
  showDetailsPatient,
  setShowDetailsPatient,
  patient,
  setPageState,
  setReceptionSelected,
  historyReception,
}) {
  
 
  return (
    <>
      <div
        style={{ zIndex: '1301', transform: showDetailsPatient ? 'translateX(0)' : 'translateX(-100%)' }}
        className="fixed top-0 bottom-0 lg:right-2/3 sm:right-1/2 right-0 left-0 bg-slate-50 duration-500 p-5 shadow-lg overflow-y-auto"
      >
        
        <div className="text-start">
          <Button
            size="small"
            sx={{
              boxShadow: 'none',
              backgroundColor: 'rgb(100 116 139)',
              '&:hover': {
                backgroundColor: 'rgb(71 85 105)',
              },
            }}
            className="rounded-md duration-300 mt-2"
            onClick={() => {
              setShowDetailsPatient(false);
            }}
            variant="contained"
          >
            <FaChevronRight
              style={{ transform: showDetailsPatient ? 'rotate(0deg)' : 'rotate(180deg)' }}
              className="text-xl text-slate-700"
            />
          </Button>
        </div>
        
        <div className='mt-2'>
        <UserCard patient={patient}/>
        </div>
        
        
       
        <div className='mt-5'>
          <p className="text-xl font-semibold">اطلاعات پذیرش ها</p>
          {
          historyReception.length>0 &&
          historyReception.map((e) => (
            <div key={e.appointmentId} className="w-full px-3 mt-3">
              <BoxReceptionPatient
                reception={e}
                setPageState={setPageState}
                setReceptionSelected={setReceptionSelected}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
