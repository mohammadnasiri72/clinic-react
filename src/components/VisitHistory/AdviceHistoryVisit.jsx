import { InputAdornment, TextField } from '@mui/material';

export default function AdviceHistoryVisit({ medicalRecord }) {
  return (
    <>
      <h3 className="text-xl font-semibold text-teal-500">توصیه های پزشک</h3>
      {medicalRecord.filter((e) => e.typeId === 4).length > 0 &&
        medicalRecord
          .filter((e) => e.typeId === 4)
          .map((e, i) => (
            <div key={e.id} className="px-3">
              <div className="flex flex-wrap items-center rounded-lg duration-300 hover:shadow-lg hover:bg-slate-50 shadow-md mt-2 p-2">
                <div className="px-1 sm:w-1/2 w-full">
                  <TextField
                    disabled
                    className="w-full"
                    id="outlined-multiline-flexible"
                    label="توصیه پزشک"
                    multiline
                    dir="rtl"
                    value={e.medicalItemName}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">{i + 1}_</InputAdornment>,
                    }}
                  />
                </div>
                <div className="px-1 sm:w-1/2 w-full sm:mt-0 mt-5">
                  <TextField
                    disabled
                    className="w-full"
                    id="outlined-multiline-flexible"
                    label="توضیحات"
                    multiline
                    dir="rtl"
                    value={e.description}
                  />
                </div>
              </div>
            </div>
          ))}
      {medicalRecord.filter((e) => e.typeId === 4).length === 0 && <p className="text-sm mt-2">موردی ثبت نشده است</p>}
    </>
  );
}
