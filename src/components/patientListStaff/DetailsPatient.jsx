/* eslint-disable no-undef */
import { IoClose } from 'react-icons/io5';
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
  setPageStateReception,
  setPageStateReserveHistory
}) {
  
 
  return (
    <>
      <div
        style={{ zIndex: '1301', transform: showDetailsPatient ? 'translateX(0)' : 'translateX(-100%)' }}
        className="fixed top-0 bottom-0 lg:right-2/3 sm:right-1/2 right-0 left-0 bg-slate-50 duration-500 p-5 shadow-lg overflow-y-auto"
      >
        <IoClose
          onClick={() => setShowDetailsPatient(false)}
          className="absolute right-3 top-2 text-4xl hover:scale-125 cursor-pointer duration-300 rounded-full bg-slate-300 p-2"
        />
        
        <div className='mt-8'>
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
                setPageStateReception={setPageStateReception}
                setPageStateReserveHistory={setPageStateReserveHistory}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
