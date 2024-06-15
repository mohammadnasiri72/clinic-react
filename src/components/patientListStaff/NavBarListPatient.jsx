import { Button, CircularProgress, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { mainDomain } from '../../utils/mainDomain';

export default function NavBarListPatient({
  setPageState,
  setIsLoading,
  patientList,
  setPatientList,
  numPages,
  setTotalPages,
}) {
  const [statusList, setStatusList] = useState([]);
  const [valStatusFilter, setValStatusFilter] = useState(-1);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios
      .get(`${mainDomain}/api/Patient/GetListPaged`, {
        params: {
          pageIndex: numPages,
          query: searchValue,
          statusId: valStatusFilter,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setPatientList(res.data.items);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [valStatusFilter, searchValue, numPages]);

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
      <div className="flex flex-wrap justify-between w-5/6 mx-auto">
        <div className="flex flex-wrap px-5">
          <div className="md:w-44 w-full">
            <TextField
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              className="w-full"
              id="outlined-multiline-flexible"
              label="کدملی / نام / نام خانوادگی"
              value={searchValue}
              minRows={1}
              
            />
          </div>
          <div className="md:pr-3 pr-0 md:mt-0 mt-3 md:w-auto w-full">
            <FormControl className="md:w-auto w-full" color="primary">
              <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
                وضعیت
              </InputLabel>
              <Select
                className="md:w-44 w-full"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={valStatusFilter}
                label="وضعیت"
                color="primary"
                onChange={(e) => setValStatusFilter(e.target.value)}
              >
                <MenuItem value={-1}>همه</MenuItem>
                {statusList.map((e, i) => (
                  <MenuItem key={i} value={i + 100}>
                    {e}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="md:w-auto w-full text-start md:mt-0 mt-3 px-5">
          <Button
            sx={{
              color:'white',
              py: 1,
              boxShadow: 'none',
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
      </div>
    </>
  );
}
