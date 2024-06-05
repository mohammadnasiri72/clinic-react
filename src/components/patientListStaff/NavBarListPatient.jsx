import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { mainDomain } from '../../utils/mainDomain';

export default function NavBarListPatient({ setPageState, searchValue, setSearchValue, setIsLoading , valStatusFilter ,setValStatusFilter}) {
  
  const [statusList, setStatusList] = useState([]);

  const filterPatientHandler = (e) => {
    setSearchValue(e.target.value);
    // setPatientList(patientList.filter((ev)=> ev.firstName.includes(e.target.value) || ev.lastName.includes(e.target.value) || ev.nationalId.includes(e.target.value)));
  };

  // get status list
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${mainDomain}/api/Patient/GetStatusList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setStatusList(Object.values(res.data));
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="flex justify-between w-5/6 mx-auto">
        <div className="flex px-5">
          <TextField
            onChange={(e) => filterPatientHandler(e)}
            className="w-full"
            id="outlined-multiline-flexible"
            label="کدملی / نام / نام خانوادگی"
            multiline
            value={searchValue}
            minRows={1}
          />
          <div className='pr-3'>
            <FormControl color="primary">
              <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
                وضعیت
              </InputLabel>
              <Select
                className="w-44"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={valStatusFilter}
                label="وضعیت"
                color="primary"
                onChange={(e) => setValStatusFilter(e.target.value)}
              >
                <MenuItem value={'همه'}>
                    همه
                  </MenuItem>
                {statusList.map((e, i) => (
                  <MenuItem key={i} value={e}>
                    {e}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
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
          onClick={() => setPageState(2)}
          variant="contained"
        >
          <span className="px-1">بیمار جدید</span>
          <FaPlus />
        </Button>
      </div>
    </>
  );
}
