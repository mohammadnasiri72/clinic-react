import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, Chip, Menu, Tooltip } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaMobile } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import { TbDoorEnter } from 'react-icons/tb';
import { mainDomain } from '../../utils/mainDomain';
import Iconify from '../Iconify';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardReception({
  reception,
  patientList,
  setChangStatusCondition,
  setPageStateReception,
  setUserSelected,
  setEditeUser,
  setIsEditStartTime,
  setIsEditEndTime,
}) {
  //  (patientList.filter((e)=>{
  //      reception.patientNationalId === e.nationalId
  //     console.log(e.nationalId);
  //     console.log(reception.patientNationalId);
  //   }));
  // console.log(reception.patientNationalId);
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [user, setUser] = useState([]);

  const patient = [...patientList];
  useEffect(() => {
    setUser(patient.find((e) => e.nationalId === reception.patientNationalId));
  }, [patient, reception]);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const nextToRoomDoctor = (e) => {
    const data = new FormData();
    data.append('appointmentId', e.appointmentId);
    axios
      .post(`${mainDomain}/api/Appointment/NextStatus`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setChangStatusCondition((e) => !e);
      })
      .catch((err) => {});
  };
  const cancelHandler = (e) => {
    const data = new FormData();
    data.append('appointmentId', e.appointmentId);
    axios
      .post(`${mainDomain}/api/Appointment/Cancel`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setChangStatusCondition((e) => !e);
      })
      .catch((err) => {});
  };
  const editHandler = (e) => {
    setPageStateReception(1);
    setEditeUser(e);
    setUserSelected(patientList.find((ev) => ev.nationalId === e.patientNationalId));
    handleClose();
    setIsEditStartTime(false);
    setIsEditEndTime(false);
  };
  return (
    <Card className="relative w-full">
      <CardContent>
        <Box className={'flex justify-center'}>
          <img
            className="w-14 h-14 rounded-full border"
            src={
              patientList.length > 0
                ? mainDomain + patientList.find((e) => e.nationalId === reception.patientNationalId).avatar
                : ''
            }
            alt=""
          />
        </Box>
        <Chip
          className="absolute top-6 right-3"
          label={reception.status}
          // color={
          //   reception.statusId === 5
          //     ? 'error'
          //     : reception.statusId === 4
          //     ? 'success'
          //     : reception.statusId === 3
          //     ? 'primary'
          //     : reception.statusId === 2
          //     ? 'warning'
          //     : 'info'
          // }
          variant="filled"
        />
        <div className="absolute left-3 top-6">
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <BsThreeDotsVertical className="cursor-pointer text-2xl" />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <div className="px-4">
              <Tooltip title="مرحله بعد" placement="right">
                <IconButton
                  disabled={reception.statusId > 2}
                  onClick={() => {
                    handleClose();
                    nextToRoomDoctor(reception);
                  }}
                >
                  <TbDoorEnter style={{ color: reception.statusId > 2 ? 'rgb(51 51 51 51)' : 'rgb(34 197 94)' }} />
                </IconButton>
              </Tooltip>
            </div>
            <div className="px-4">
              <Tooltip title="ویرایش" placement="right">
                <IconButton
                  onClick={() => {
                    editHandler(reception);
                    handleClose();
                  }}
                  disabled={reception.statusId > 2}
                >
                  <Iconify icon={'eva:edit-fill'} />
                </IconButton>
              </Tooltip>
            </div>
            <div className="px-4">
              <Tooltip title="کنسل" placement="right">
                <IconButton
                  onClick={() => {
                    cancelHandler(reception);
                    handleClose();
                  }}
                  disabled={reception.statusId > 2}
                >
                  <GiCancel style={{ color: reception.statusId > 2 ? 'rgb(51 51 51 51)' : 'rgb(239 68 68)' }} />
                </IconButton>
              </Tooltip>
            </div>
          </Menu>
        </div>
        <h3 className="text-xl font-semibold">
          {reception.patientFirstName} {reception.patientLastName}
        </h3>
        <p className="mt-2">کد ملی : {reception.patientNationalId}</p>
      </CardContent>
      <CardActions className="h-10" disableSpacing>
        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>توضیحات:</Typography>
          <p className="mt-2">ساعت ورود : {reception?.startTime}</p>
          <p className="mt-2">تاریخ ورود : {reception?.appointmentDateFA}</p>
          <p className="mt-2">
            نام دکتر : {reception?.doctorFirstName} {reception?.doctorLastName}
          </p>
          <p className="mt-2 flex items-center justify-center">
            <Tooltip title="پیامک" placement="right">
              <IconButton>
                <FaMobile className="cursor-pointer" />
              </IconButton>
            </Tooltip>
            {user.userPhoneNumber ? user.userPhoneNumber : '____'}
          </p>
          <p className="mt-2">نام پدر : {user.fatherName ? user.fatherName : '____'}</p>
          <p className="mt-2">تلفن ثابت : {user.tel ? user.tel : '____'}</p>
        </CardContent>
      </Collapse>
    </Card>
  );
}
