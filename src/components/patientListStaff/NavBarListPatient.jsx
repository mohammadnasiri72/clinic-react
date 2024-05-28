import { Button, TextField } from '@mui/material';
import { FaPlus } from "react-icons/fa6";


export default function NavBarListPatient({setPageState , searchValue , setSearchValue}) {
  
  const filterPatientHandler = (e)=>{
    setSearchValue(e.target.value);
    // setPatientList(patientList.filter((ev)=> ev.firstName.includes(e.target.value) || ev.lastName.includes(e.target.value) || ev.nationalId.includes(e.target.value)));
  }
  return (
    <>
    <div className="flex justify-between w-5/6 mx-auto">
         <div className=" px-5">
        <TextField
          onChange={(e) => filterPatientHandler(e)}
          className="w-full"
          id="outlined-multiline-flexible"
          label="کدملی / نام / نام خانوادگی"
          multiline
          value={searchValue}
          minRows={1}
        />
      </div>
        {/* <button onClick={()=> setPageState(2)} className="flex justify-center items-center bg-green-500 px-5  rounded-md duration-300 hover:bg-green-600 text-white">
          <span className="px-1">بیمار جدید</span>
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
            onClick={()=> setPageState(2)}
            variant="contained"
          >
            <span className="px-1">بیمار جدید</span>
          <FaPlus />
          </Button>
      </div>
    </>
  );
}
