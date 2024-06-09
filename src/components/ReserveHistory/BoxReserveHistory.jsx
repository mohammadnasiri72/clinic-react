import { Box, Checkbox, FormControlLabel, IconButton, Tooltip } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineMessage } from 'react-icons/ai';
import { mainDomain } from '../../utils/mainDomain';
import MessageHandler from '../Reception/MessageHandler';
import DetailsPatient from '../patientListStaff/DetailsPatient';
import CardReserveHistory from './CardReserveHistory';

export default function BoxReserveHistory({
  patientUserId,
  doctorId,
  fromPersianDate,
  toPersianDate,
  statusId,
  setIsLoading,
  listReserveHistory,
  setListReserveHistory,
}) {
  const [showDetailsPatient, setShowDetailsPatient] = useState(false);
  const [patient, setPatient] = useState({});
  const [historyReception, setHistoryReception] = useState([]);
  const [patientId, setPatientId] = useState('');
  const [openBoxMessage, setOpenBoxMessage] = useState(false);
  const [userId, setUserId] = useState([]);
  const [listReserveChecked, setListReserveChecked] = useState([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${mainDomain}/api/Reservation/GetList`, {
        params: {
          patientUserId,
          doctorId,
          fromPersianDate,
          toPersianDate,
          statusId: -1,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setListReserveHistory(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [fromPersianDate, toPersianDate, doctorId, patientUserId, flag]);

  useEffect(() => {
    if (patient.nationalId) {
      axios
        .get(`${mainDomain}/api/Appointment/GetList`, {
          params: {
            typeId: 1,
            patientNationalId: patient.nationalId,
            doctorMedicalSystemId: -1,
            statusId: -1,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setHistoryReception(res.data);
        })
        .catch((err) => {});
    }
  }, [patient]);

  useEffect(() => {
    if (patientId.length > 0) {
      axios
        .get(`${mainDomain}/api/Patient/GetList`, {
          params: {
            query: patientId,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setPatient(res.data[0]);
        })
        .catch((err) => {
          //   setIsLoading(false);
        });
    }
  }, [patientId]);

  useEffect(() => {
    if (showDetailsPatient) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [showDetailsPatient]);

  const sendMessageToAll = () => {
    setOpenBoxMessage(true);
    const arr = [];
    listReserveChecked.map((ev) => {
      arr.push(ev.patientUserId);
      return true;
    });
    setUserId(arr);
  };

  useEffect(() => {
    if (
      listReserveChecked.length >
      listReserveHistory.filter((ev) => (statusId >= 0 ? ev.statusId === statusId : ev)).length
    ) {
      const arr = [];
      listReserveHistory
        .filter((ev) => (statusId >= 0 ? ev.statusId === statusId : ev))
        .map((e) => {
          arr.push(...listReserveChecked.filter((event) => event === e));
          return true;
        });
      setListReserveChecked(arr);
    }
  }, [listReserveChecked, statusId, listReserveHistory]);
  return (
    <>
      {listReserveHistory.filter((ev) => (statusId >= 0 ? ev.statusId === statusId : ev)).length > 0 && (
        <div className="flex justify-between shadow-sm mt-2 rounded-md px-1">
          <FormControlLabel
            control={
              <Checkbox
                size="large"
                indeterminate={
                  listReserveChecked.length > 0 &&
                  listReserveHistory.filter((ev) => (statusId >= 0 ? ev.statusId === statusId : ev)).length !==
                    listReserveChecked.length
                }
                checked={
                  listReserveHistory.filter((ev) => (statusId >= 0 ? ev.statusId === statusId : ev)).length ===
                    listReserveChecked.length && listReserveHistory.length !== 0
                }
                onChange={() => {
                  if (
                    listReserveChecked.length ===
                      listReserveHistory.filter((ev) => (statusId >= 0 ? ev.statusId === statusId : ev)).length &&
                    listReserveChecked.length !== 0
                  ) {
                    setListReserveChecked([]);
                  } else {
                    setListReserveChecked(
                      listReserveHistory.filter((ev) => (statusId >= 0 ? ev.statusId === statusId : ev))
                    );
                  }
                }}
              />
            }
          />
          <Tooltip title="ارسال پیام" placement="right">
            <span>
              <IconButton disabled={listReserveChecked.length === 0} onClick={sendMessageToAll}>
                <AiOutlineMessage style={{ color: listReserveChecked.length === 0 ? 'inherit' : 'rgb(16 185 129)' }} />
              </IconButton>
            </span>
          </Tooltip>
        </div>
      )}
      {listReserveHistory.filter((ev) => (statusId >= 0 ? ev.statusId === statusId : ev)).length === 0 && (
        <div className="mt-2">موردی موجود نیست</div>
      )}
      <div className="flex flex-wrap">
        {listReserveHistory
          .filter((ev) => (statusId >= 0 ? ev.statusId === statusId : ev))
          .map((e, i) => (
            <div key={i} className="lg:w-1/4 md:w-1/3 sm:w-1/2 w-full p-2 relative">
              <CardReserveHistory
                listReserveChecked={listReserveChecked}
                setListReserveChecked={setListReserveChecked}
                e={e}
                listReserveHistory={listReserveHistory}
                statusId={statusId}
                setShowDetailsPatient={setShowDetailsPatient}
                setPatientId={setPatientId}
                setOpenBoxMessage={setOpenBoxMessage}
                setUserId={setUserId}
                setIsLoading={setIsLoading}
                setFlag={setFlag}
              />
            </div>
          ))}
      </div>
      <DetailsPatient
        showDetailsPatient={showDetailsPatient}
        setShowDetailsPatient={setShowDetailsPatient}
        patient={patient}
        historyReception={historyReception}
      />
      <MessageHandler open={openBoxMessage} setOpen={setOpenBoxMessage} userId={userId} setIsLoading={setIsLoading} />
      <Box
        sx={{ zIndex: '1300' }}
        onClick={() => setShowDetailsPatient(false)}
        style={{ display: showDetailsPatient ? 'block' : 'none' }}
        className="fixed top-0 bottom-0 left-0 right-0 bg-[#000c]"
      />
    </>
  );
}
