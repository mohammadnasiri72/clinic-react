import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import PropTypes from 'prop-types';
import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useEffect } from 'react';
import { mainDomain } from '../../utils/mainDomain';
import DiagnosisPatient from './DiagnosisPatient';
import DrugPatient from './DrugPatient';
import InformationPatient from './InformationPatient';
import Order from './Order';
import UploadDocumentsDoctor from './UploadDocumentsDoctor';
import ViewOrderPopup from './ViewOrderPopup';
import BoxImg from '../Counseling/BoxImg';
import BoxVideo from '../Counseling/BoxVideo';
import BoxAudio from '../Counseling/BoxAudio';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}

export default function SecoundPageVisit({ patSelected, setIsLoading }) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [infoPat, setInfoPat] = React.useState({});
  const [isOpenOrder, setIsOpenOrder] = React.useState(false);
  const [orderEdit, setOrderEdit] = React.useState([]);
  const [flag, setFlag] = React.useState(false);

  const [filesUpload, setFilesUpload] = React.useState([]);
  const [isShowImg, setIsShowImg] = React.useState(false);
  const [isShowAudio, setIsShowAudio] = React.useState(false);
  const [isShowVideo, setIsShowVideo] = React.useState(false);
  const [src, setSrc] = React.useState('');
  const [srcVideo, setSrcVideo] = React.useState('');
  const [srcAudio, setSrcAudio] = React.useState('');

  useEffect(() => {
    axios
      .get(`${mainDomain}/api/Patient/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setInfoPat(res.data.find((e) => e.nationalId === patSelected.patientNationalId));
      })
      .catch((err) => {});
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className="flex">
      <Box
        sx={{
          bgcolor: 'background.paper',
          position: 'relative',
          minHeight: 200,
          width: '100%',
        }}
      >
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="action tabs example"
          >
            <Tab label="اطلاعات بیمار" {...a11yProps(0)} />
            <Tab label="معاینه" {...a11yProps(1)} />
            <Tab label="دارو ها" {...a11yProps(2)} />
            <Tab label="اردرها" {...a11yProps(2)} />
            <Tab label="فایل های ضمیمه" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <InformationPatient infoPat={infoPat} />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <DiagnosisPatient patSelected={patSelected} setIsLoading={setIsLoading} />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <DrugPatient patSelected={patSelected} setIsLoading={setIsLoading} />
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            <Order
              patSelected={patSelected}
              setIsLoading={setIsLoading}
              setIsOpenOrder={setIsOpenOrder}
              setOrderEdit={setOrderEdit}
              setFlag={setFlag}
              flag={flag}
            />
          </TabPanel>
          <TabPanel value={value} index={4} dir={theme.direction}>
            <UploadDocumentsDoctor
              patSelected={patSelected}
              setIsLoading={setIsLoading}
              filesUpload={filesUpload}
              setFilesUpload={setFilesUpload}
              isShowImg={isShowImg}
              setIsShowImg={setIsShowImg}
              isShowAudio={isShowAudio}
              setIsShowAudio={setIsShowAudio}
              isShowVideo={isShowVideo}
              setIsShowVideo={setIsShowVideo}
              src={src}
              setSrc={setSrc}
              srcVideo={srcVideo}
              setSrcVideo={setSrcVideo}
              srcAudio={srcAudio}
              setSrcAudio={setSrcAudio}
            />
          </TabPanel>
        </SwipeableViews>
      </Box>

      <ViewOrderPopup
        isOpenOrder={isOpenOrder}
        setIsOpenOrder={setIsOpenOrder}
        setIsLoading={setIsLoading}
        orderEdit={orderEdit}
        setFlag={setFlag}
      />
      <BoxImg isShowImg={isShowImg} setIsShowImg={setIsShowImg} src={src} filesUpload={filesUpload} setSrc={setSrc} />
      <BoxVideo srcVideo={srcVideo} isShowVideo={isShowVideo} setIsShowVideo={setIsShowVideo} />
      <BoxAudio isShowAudio={isShowAudio} srcAudio={srcAudio} setIsShowAudio={setIsShowAudio} />
    </div>
  );
}
