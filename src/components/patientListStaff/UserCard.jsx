import PropTypes from 'prop-types';
// @mui
import { Avatar, Box, Card, Divider, IconButton, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AiOutlineMessage } from 'react-icons/ai';
// utils
import cssStyles from '../../utils/cssStyles';
// components
import { mainDomain } from '../../utils/mainDomain';

// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.darker }),
  top: 0,
  zIndex: 8,
  content: "''",
  width: '100%',
  height: '100%',
  position: 'absolute',
}));

// ----------------------------------------------------------------------

UserCard.propTypes = {
  patient: PropTypes.object.isRequired,
};

export default function UserCard({ patient, setOpenBoxMessage , setShowDetailsPatient}) {
  return (
    <Card sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        {/* <SvgIconStyle
          src="https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg"
          sx={{
            width: 144,
            height: 62,
            zIndex: 10,
            left: 0,
            right: 0,
            bottom: -26,
            mx: 'auto',
            position: 'absolute',
            color: 'background.paper',
          }}
        /> */}
        <Avatar
          alt={'avatar'}
          src={mainDomain + patient.avatar}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            left: 0,
            right: 0,
            bottom: -32,
            mx: 'auto',
            position: 'absolute',
          }}
        />
        {/* <OverlayStyle /> */}
        <div className="w-full h-14 overflow-hidden bg-teal-500" />
      </Box>

      <div className="flex justify-between px-4">
        <span className="mt-10 w-1/6">{patient.gender === 'm' ? 'مرد' : 'زن'}</span>
        <div className="w-2/3">
          <Typography variant="subtitle1" sx={{ mt: 6, fontSize: 20 }}>
            {patient.firstName} {patient.lastName}
          </Typography>

          <div className="flex items-center justify-center">
            <Typography className="px-2" variant="body2" sx={{ color: 'text.secondary' }}>
              {patient.nationalId}
            </Typography>
            <Tooltip title="ارسال پیام">
              <IconButton onClick={()=>{
                setOpenBoxMessage(true)
                setShowDetailsPatient(false)
              }}>
                <AiOutlineMessage className="text-xl cursor-pointer hover:text-teal-500 duration-300" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <span className="mt-10 w-1/6 whitespace-nowrap">{patient.abroad ? 'خارج ایران' : 'ساکن ایران'}</span>
      </div>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <div className="flex">
        <div className="w-1/2 flex p-2">
          <span>فرزند : </span>
          <span className="px-1"> {patient.fatherName ? patient.fatherName : '______'} </span>
        </div>
        <div className="w-1/2 flex p-2 justify-end">
          <span>متولد : </span>
          <span className="px-1"> {patient.dateOfBirthFa} </span>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/3 flex p-2">
          <span>تلفن : </span>
          <span className="px-2"> {patient.tel ? patient.tel : '______'} </span>
        </div>
        <div className="w-2/3 flex p-2 justify-end">
          <span>استان/شهر : </span>
          <span className="px-1">
            {patient.province ? patient.province : '______'} / {patient.city ? patient.city : '______'}
          </span>
        </div>
      </div>
      <div className="flex p-2">
        <span>موبایل/ایمیل : </span>
        <span className="px-1"> {patient.abroad ? patient.userEmail : patient.userPhoneNumber} </span>
      </div>
      <div className="flex p-2">
        <span>شماره پرونده : </span>
        <span className="px-1"> {patient.fileNumber ? patient.fileNumber : '______'} </span>
      </div>
      <div className="flex p-2">
        <span>آدرس : </span>
        <span className="px-1"> {patient.address ? patient.address : '______'} </span>
      </div>
    </Card>
  );
}
