import { Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';

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



export default function ShowPatient({ patList, setRefreshPatList, setPatSelected, patSelected, pageStateVisit }) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [valDoing, setValDoing] = React.useState('');
  React.useEffect(() => {
    setValDoing(patSelected.appointmentId);
  }, [pageStateVisit, patSelected]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box
      className="h-full"
      sx={{
        bgcolor: 'background.paper',
        // width: 500,
        position: 'relative',
        minHeight: 200,
      }}
    >
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onClick={() => setRefreshPatList((e) => !e)}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="در حال انجام (doing)" {...a11yProps(0)} />
          <Tab label="لیست انتظار (waiting)" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel className="max-h-[70vh] overflow-auto" value={value} index={0} dir={theme.direction}>
          <ToggleButtonGroup
            orientation="vertical"
            value={valDoing}
            exclusive
            onChange={(event, newEvent) => setValDoing(newEvent)}
          >
            {patList
              .filter((e) => e.status === 'Doing')
              .map((e) => (
                <ToggleButton
                  onClick={() => setPatSelected(e)}
                  key={e.appointmentId}
                  value={e.appointmentId}
                  aria-label="list"
                >
                  <span>{`${e.patientFirstName} ${e.patientLastName} ${e.patientNationalId}`}</span>
                </ToggleButton>
              ))}
          </ToggleButtonGroup>
        </TabPanel>
        <TabPanel className="max-h-[70vh] overflow-auto" value={value} index={1} dir={theme.direction}>
          {patList
            .filter((e) => e.status === 'Waiting')
            .map((e) => (
              <div key={e.appointmentId}>
                <Button>{`${e.patientFirstName} ${e.patientLastName} ${e.patientNationalId}`}</Button>
              </div>
            ))}
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
