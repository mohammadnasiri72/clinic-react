import axios from 'axios';
import { Button, Checkbox, FormControlLabel, IconButton } from '@mui/material';
import { FaTrashAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';
import AccordionMessage from './AccordionMessage';
import SimpleBackdrop from '../backdrop';
import CheckBoxMessage from './CheckBoxMessage';

export default function MainPageMyMessage({ flagNotif, setFlagNotif }) {
  const [message, setMessage] = useState([]);
  const [numberItems, setNumberItems] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState('');
  const [listMessageChecked, setListMessageChecked] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${mainDomain}/api/Message/GetListPaged`, {
        params: {
          pageSize: numberItems,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setMessage(res.data.items);
        setTotalCount(res.data.totalCount);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [flagNotif, numberItems]);

  return (
    <>
      <div className="flex justify-between rounded-lg">
        {message.length > 0 && (
          <FormControlLabel
            control={
              <Checkbox
                indeterminate={listMessageChecked.length > 0 && message.length !== listMessageChecked.length}
                checked={message.length === listMessageChecked.length && message.length !== 0}
                onChange={() => {
                  if (listMessageChecked.length === message.length && listMessageChecked.length !== 0) {
                    setListMessageChecked([]);
                  } else {
                    setListMessageChecked(message);
                  }
                }}
              />
            }
          />
        )}
        <div className="w-full">
          <h3 className="text-xl font-semibold">پیغام‌ های من</h3>
        </div>
        {message.length > 0 && (
          <IconButton disabled={listMessageChecked.length === 0}>
            <FaTrashAlt />
          </IconButton>
        )}
      </div>
      {message.map((e) => (
        <div className="flex items-center" key={e.messageId}>
          <CheckBoxMessage
            listMessage={message}
            message={e}
            listMessageChecked={listMessageChecked}
            setListMessageChecked={setListMessageChecked}
          />
          <div className="w-full">
            <AccordionMessage message={e} setFlag={setFlagNotif} />
          </div>
          <IconButton size="small">{/* <FaTrashAlt /> */}</IconButton>
        </div>
      ))}
      <div className="pb-10 ">
        <Button
          // eslint-disable-next-line no-nested-ternary
          sx={{ display: message.length === totalCount ? 'none' : message.length === 0 ? 'none' : 'inline' }}
          onClick={() => {
            setNumberItems(numberItems + 20);
          }}
        >
          بیشتر
        </Button>
      </div>
      {isLoading && <SimpleBackdrop />}
    </>
  );
}
