import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';
import MyReserveBox from './MyReserveBox';
import MyVisitedBox from './MyVisitedBox';
import SimpleBackdrop from '../backdrop';

export default function MyReservation({ setPageState, account }) {
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState('');
  const [reserveList, setReserveList] = useState([]);
  const [flag, setFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${mainDomain}/api/Doctor/GetList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setDoctors(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);
  useEffect(() => {
    if (account.userId) {
      setIsLoading(true);
      axios
        .get(`${mainDomain}/api/Reservation/GetList`, {
          params: {
            patientUserId: account.userId,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setIsLoading(false);
          setReserveList(res.data);
          setDoctor(doctors.find((e) => e.doctorId === res.data[0]?.reservationTimeDoctorId));
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, [doctors, account, flag]);
  return (
    <>
      <div className="text-start">
        <h3 className="text-3xl font-bold">نوبت های {setPageState ? 'بیمار' : 'من'}</h3>
      </div>
      {reserveList.filter((e) => e.statusId === 1).length === 0 && (
        <div className="w-5/6 mx-auto border rounded-lg mt-5 pt-2 pb-6">
          <p className="mt-3">نوبت های {setPageState ? 'بیمار' : 'شما'} خالی است</p>
        </div>
      )}
      {reserveList
        .filter((e) => e.statusId === 1)
        .map((list) => (
          <div key={list.reservationId} className="w-5/6 mx-auto border rounded-lg mt-5 pt-2 pb-6">
            <MyReserveBox
              list={list}
              doctor={doctor}
              setFlag={setFlag}
              setIsLoading={setIsLoading}
              setPageState={setPageState}
            />
          </div>
        ))}
      <p className="text-xl text-start font-semibold mt-6">نوبت های ویزیت شده</p>
      {reserveList.filter((e) => e.statusId !== 1).length === 0 && (
        <div>
          <p className="mt-3">نوبت ویزیت شده ای موجود نیست</p>
        </div>
      )}
      {reserveList.filter((e) => e.statusId !== 1).length > 0 && (
        <div className="flex w-5/6 mx-auto">
          {reserveList
            .filter((e) => e.statusId !== 1)
            .map((list) => (
              <div key={list.reservationId} className="lg:w-1/3 sm:w-1/2 w-full p-2">
                <div className="border rounded-lg ">
                  <MyVisitedBox list={list} doctor={doctor} />
                </div>
              </div>
            ))}
        </div>
      )}
      {isLoading && <SimpleBackdrop />}
    </>
  );
}
