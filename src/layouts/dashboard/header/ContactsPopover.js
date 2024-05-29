// @mui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineMessage } from "react-icons/ai";
// utils
// _mock_
// components
import { IoCloseSharp } from 'react-icons/io5';
import { mainDomain } from '../../../utils/mainDomain';

// ----------------------------------------------------------------------

export default function ContactsPopover() {
  const [open, setOpen] = useState(false);
  const [listStaff, setListStaff] = useState([]);
  //   open modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  //   close modal
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get(`${mainDomain}/api/Staff/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setListStaff(res.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <Tooltip title="ارسال پیام">
        <IconButton onClick={handleClickOpen}>
          <AiOutlineMessage className="cursor-pointer text-2xl" />
        </IconButton>
      </Tooltip>
      <Dialog
        sx={{ '& .MuiDialog-paper': { minHeight: 455 }, zIndex: '99999' }}
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>ارسال پیام</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <IoCloseSharp />
        </IconButton>
        <DialogContent>
          <div className="">
            <div className="flex justify-start items-center">
              <h6 className='whitespace-nowrap'>ارسال به : </h6>
              <div className="w-full px-3">
                <FormControl color="primary" className="w-full">
                  <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
                  انتخاب پرسنل
                  </InputLabel>
                  <Select
                    // onChange={(e) => setValType(e.target.value)}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="انتخاب پرسنل"
                    color="primary"
                    // value={valType}
                  >
                    {listStaff.map((e, i) => (
                      <MenuItem key={i}>یسیسی</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="w-full mt-5">
              <TextField
                className="w-full text-end"
                id="outlined-multiline-flexible"
                label="موضوع"
                dir="rtl"
                // value={infoPat.firstName ? `${infoPat.firstName} ${infoPat.lastName}` : '_____'}
              />
            </div>
            <div className="mt-5 w-full">
              <TextField
                className="w-full text-end"
                id="outlined-multiline-flexible"
                label="متن پیام"
                dir="rtl"
                multiline
                minRows={3}
                // value={infoPat.firstName ? `${infoPat.firstName} ${infoPat.lastName}` : '_____'}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              py: 2,
              boxShadow: 'none',
              color: 'white',
              backgroundColor: 'rgb(16 185 129)',
              '&:hover': {
                backgroundColor: 'rgb(5 150 105)',
              },
            }}
            // onClick={saveTimeHandler}
          >
             ارسال پیام
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
