import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { useState } from 'react';

export default function ToggleButtonCondition({ listReserveHistory, setStatusId, statusList}) {
  const [alignment, setAlignment] = useState(-1);

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <>
      <Stack className="w-full ">
        <ToggleButtonGroup
          className="flex justify-around"
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton
            onClick={() => setStatusId(-1)}
            color="info"
            
            // style={{ backgroundColor: focus ? 'rgb(226 232 240)' : 'transparent' }}
            className="focus:bg-slate-200"
            value={-1}
            aria-label="left aligned"
          >
            <div className="px-2">
              <span>همه</span>
            </div>
            <span className="w-8 h-8 bg-[#b0b0b0] text-white rounded-lg flex justify-center items-center">
              {listReserveHistory.length}
            </span>
          </ToggleButton>
          {statusList.map((e, i) => (
          <div key={i} className="px-5 ">
            <ToggleButton
              color="info"
              onClick={() => setStatusId(i)}
              className="focus:bg-slate-200"
              value={e}
            >
              <div className="px-2">
                <span>{e}</span>
              </div>
              <span className="w-8 h-8 bg-[#b0b0b0] text-white rounded-lg flex justify-center items-center">
                {listReserveHistory.filter((e) => e.status === statusList[i]).length}
              </span>
            </ToggleButton>
          </div>
        ))}
        </ToggleButtonGroup>
      </Stack>
    </>
  );
}
