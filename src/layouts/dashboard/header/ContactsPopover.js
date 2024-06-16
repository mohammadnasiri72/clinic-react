// @mui
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Switch,
  TextField,
  Tooltip,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineMessage } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { IoCloseSharp } from 'react-icons/io5';
import SimpleBackdrop from '../../../components/backdrop';
// utils
// _mock_
// components
import { mainDomain } from '../../../utils/mainDomain';

// ----------------------------------------------------------------------

export default function ContactsPopover({ account, setIsLoading }) {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [listStaff, setListStaff] = useState([]);
  const [valStaff, setValStaff] = useState([]);
  const [userIdList, setUserIdList] = useState([]);
  const [isActiveNotif, setIsActiveNotif] = useState(true);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  //   open modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  //   close modal
  const handleClose = () => {
    setOpen(false);
    setSubject('');
    setBody('');
    setIsActiveNotif(true);
    setValStaff([]);
  };

  useEffect(() => {
    axios
      .get(`${mainDomain}/api/Message/Recipient/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setListStaff(res.data);
      })
      .catch((err) => {});
  }, []);

  const changProblem = (event, newValue) => {
    setValStaff(newValue);
    if (newValue.find((e) => e.fullName === 'همه')) {
      setValStaff([newValue.find((e) => e.fullName === 'همه')]);
      const arr = [];
      listStaff
        .filter((e) => e.userId !== account.userId)
        .map((e) => {
          arr.push(e.userId);
          return true;
        });
      setUserIdList(arr);
    }
    if (!newValue.find((e) => e.fullName === 'همه') && newValue.length > 0) {
      const arr = [];
      newValue.map((e) => {
        arr.push(e.userId);
        return true;
      });
      setUserIdList(arr);
    }
  };

  const sendMessageHandler = () => {
    if (userIdList.length === 0) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا مخاطب مورد نظر خود را وارد کنید',
      });
    } else if (!subject) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا موضوع پیام خود را وارد کنید',
      });
    } else if (!body) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا متن پیام خود را وارد کنید',
      });
    } else {
      const data = {
        userIdList,
        subject,
        body,
        sendNotification: isActiveNotif,
      };
      setIsLoading(true);
      axios
        .post(`${mainDomain}/api/Message/Add`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setIsLoading(false);
          handleClose();
          Toast.fire({
            icon: 'success',
            text: 'پیام با موفقیت ارسال شد',
          });
        })
        .catch((err) => {
          setIsLoading(false);
          Toast.fire({
            icon: 'error',
            text: err.response ? err.response.data : 'خطای شبکه',
          });
        });
    }
  };

  return (
    <>
      <Tooltip title="ارسال پیام">
        <IconButton onClick={handleClickOpen}>
          <AiOutlineMessage className="cursor-pointer text-2xl" />
        </IconButton>
      </Tooltip>
      <Dialog
        sx={{ '& .MuiDialog-paper': { minHeight: 455 }, zIndex: '1200' }}
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
              <h6 className="whitespace-nowrap">ارسال به : </h6>
              <div className="w-full px-3">
                <Autocomplete
                  value={valStaff}
                  onChange={(event, newValue) => {
                    changProblem(event, newValue);
                  }}
                  multiple
                  id="tags-outlined"
                  options={[{ fullName: 'همه' }, ...listStaff.filter((e) => e.userId !== account.userId)]}
                  getOptionLabel={(option) => option.fullName}
                  filterSelectedOptions
                  renderInput={(params) => <TextField {...params} label="پرسنل" placeholder="انتخاب پرسنل" />}
                />
              </div>
            </div>
            <div className="w-full mt-5">
              <TextField
                className="w-full text-end"
                id="outlined-multiline-flexible"
                label="موضوع"
                dir="rtl"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
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
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>
            <div>
              <FormControlLabel
                value={isActiveNotif}
                onChange={() => setIsActiveNotif(!isActiveNotif)}
                control={<Switch checked={isActiveNotif} />}
                label="اطلاع رسانی"
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
            onClick={sendMessageHandler}
          >
            ارسال پیام
          </Button>
        </DialogActions>
      </Dialog>
      {/* {isLoading && 
      <div style={{zIndex:'860000000'}} className='w-full flex justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-[#0002]'>
      
      <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
    </div>
      } */}
    </>
  );
}
