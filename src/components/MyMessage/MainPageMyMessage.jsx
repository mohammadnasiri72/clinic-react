import axios from 'axios';
import { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';
import AccordionMessage from './AccordionMessage';

export default function MainPageMyMessage({ flagNotification, setFlagNotification }) {
  const [message, setMessage] = useState([]);
  //   const [flag, setFlag] = useState(false);

  useEffect(()=>{
    setFlagNotification((e)=>!e)
  },[])

  useEffect(() => {
    axios
      .get(`${mainDomain}/api/Message/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setMessage(res.data);
      })
      .catch((err) => {});
  }, [flagNotification]);
  return (
    <>
      <h3 className="text-xl font-semibold">پیغام‌ های من</h3>
      {message.map((e) => (
        <div key={e.messageId}>
          <AccordionMessage message={e} setFlag={setFlagNotification} />
        </div>
      ))}
    </>
  );
}
