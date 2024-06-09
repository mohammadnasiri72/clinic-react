import { useState } from 'react';
import { Button, Skeleton, Stack } from '@mui/material';
import { FaPlus } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa6';
import SimpleBackdrop from '../backdrop';
import BoxRelative from './BoxRelative';

export default function RelativePatient({
  isOpenAccompanying,
  setIsOpenAddRelative,
  setIsOpenAccompanying,
  PatientRelative,
  setEditRelative,
  setFlag,
  isLoading,
  setIsLoading,
}) {
  const addPatientRelativeHandler = () => {
    setIsOpenAddRelative(true);
    setEditRelative({});
  };
  return (
    <>
      <div
        style={{ zIndex: '1300', transform: isOpenAccompanying ? 'translateX(0)' : 'translateX(-100%)' }}
        className="fixed top-0 bottom-0 lg:right-2/3 sm:right-1/2 right-0 left-0 bg-slate-50 duration-500 p-5 shadow-lg overflow-y-auto"
      >
        <div className="text-start mb-3">
          <Button
            sx={{
              py: 1,
              boxShadow: 'none',
              backgroundColor: 'rgb(100 116 139)',
              '&:hover': {
                backgroundColor: 'rgb(71 85 105)',
              },
            }}
            className="rounded-md duration-300 mt-2"
            onClick={() => {
              setIsOpenAccompanying(false);
            }}
            variant="contained"
          >
            <FaChevronRight
              style={{ transform: isOpenAccompanying ? 'rotate(0deg)' : 'rotate(180deg)' }}
              className="text-xl text-slate-700"
            />
          </Button>
        </div>
        <div>
          <Button
            sx={{
              py: 2,
              boxShadow: 'none',
              backgroundColor: 'rgb(16 185 129)',
              '&:hover': {
                backgroundColor: 'rgb(5 150 105)',
              },
            }}
            className="rounded-md duration-300 mt-2"
            onClick={addPatientRelativeHandler}
            variant="contained"
          >
            <span className="px-2">افزودن همراه</span>
            <FaPlus />
          </Button>
        </div>
        <div className="mt-3">
          <h3 className="text-xl font-semibold">لیست همراهان</h3>
        </div>
        {PatientRelative.length > 0 && (
          <BoxRelative
            PatientRelative={PatientRelative}
            setIsLoading={setIsLoading}
            setIsOpenAddRelative={setIsOpenAddRelative}
            setEditRelative={setEditRelative}
            setFlag={setFlag}
          />
        )}
        {PatientRelative.length === 0 && !isLoading && <p className="mt-5">لیست همراهان خالی است</p>}
        {PatientRelative.length === 0 && isLoading && (
          <div className="w-full">
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          </div>
        )}
      </div>
      {isLoading && <SimpleBackdrop />}
    </>
  );
}
