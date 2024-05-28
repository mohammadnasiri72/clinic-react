import { Button } from '@mui/material';
import { useState } from 'react';
import SelecDoctor from './SelecDoctor';
import SelectExpertises from './SelectExpertises';
import SelectServicesNotPersonal from './SelectServicesNotPersonal';

export default function SelectServices({ setPageNumber, valDoctor, setValDoctor, service, setService }) {
  const [expertise, setExpertise] = useState('همه');

  return (
    <>
      <div className="w-1/2 mx-auto">
        <h2 className="text-2xl font-semibold">لطفا خدمات مد نظر خود را وارد کنید</h2>
        <SelectExpertises expertise={expertise} setExpertise={setExpertise} />
        <SelecDoctor expertise={expertise} valDoctor={valDoctor} setValDoctor={setValDoctor} />
        <SelectServicesNotPersonal service={service} setService={setService} />

        <div className="flex justify-between mt-5 px-4">
          {/* <button onClick={()=> setPageNumber(0)} className='px-5 py-2 rounded-md bg-red-500 text-white duration-300 hover:bg-red-600'>برگشت به صفحه قبل</button> */}
          <Button
            sx={{
              py: 1,
              boxShadow: 'none',
              // fontSize: 20,
              backgroundColor: 'rgb(6 182 212)',
              '&:hover': {
                backgroundColor: 'rgb(8 145 178)',
              },
            }}
            className="p-2 rounded-md duration-300 whitespace-nowrap text-white"
            onClick={() => setPageNumber(0)}
            variant="contained"
          >
            برگشت به صفحه قبل
          </Button>
          {/* <button onClick={()=> setPageNumber(2)} className='px-5 py-2 rounded-md bg-green-500 text-white duration-300 hover:bg-green-600'>مرحله بعد</button> */}
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
            className="p-2 rounded-md duration-300 whitespace-nowrap text-white"
            onClick={() => setPageNumber(2)}
            variant="contained"
          >
            مرحله بعد
          </Button>
        </div>
      </div>
    </>
  );
}
