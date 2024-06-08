import { Card, CardContent, Chip, IconButton, Tooltip } from '@mui/material';
import { useEffect } from 'react';
import { BiDetail } from 'react-icons/bi';

export default function BoxReceptionPatient({
  reception,
  setPageStateVisitHistory,
  setReceptionSelected,
  setPageState,
}) {
  let color = 'default';
  if (reception.statusId === 5) {
    color = 'error';
  } else if (reception.statusId === 4) {
    color = 'success';
  } else if (reception.statusId === 3) {
    color = 'primary';
  } else if (reception.statusId === 2) {
    color = 'warning';
  } else {
    color = 'info';
  }

  return (
    <>
      <Card className="relative w-full">
        <CardContent>
          <div className="flex justify-between items-center">
            <Chip size="small" label={reception.status} color={color} variant="filled" />

            <h3 className="font-semibold -translate-y-6">
              <span className=" md:text-lg text-sm ">مشخصات پذیرش</span>
            </h3>
            <Tooltip title="مشاهده جزئیات" placement="bottom">
              <IconButton
                onClick={() => {
                  if (setPageState) {
                    setPageState(5);
                  } else if (setPageStateVisitHistory) {
                    setPageStateVisitHistory(1);
                  }
                  setReceptionSelected(reception);
                }}
              >
                <BiDetail className="text-teal-500" />
              </IconButton>
            </Tooltip>
          </div>
          <p className="mt-2">
            <span>تاریخ پذیرش :</span>
            {reception.appointmentDateFA}
          </p>
        </CardContent>
      </Card>
    </>
  );
}
