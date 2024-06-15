import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { useState } from 'react';

export default function ToggleFilterCondition({
  receptions,
  conditionList,
  setFocus,
  setStatusCondition,
  setFlagCondition,
}) {
  const [alignment, setAlignment] = useState(-1);

  const handleAlignment = (event, newAlignment) => {
    setFlagCondition((e) => !e);
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const filterHandler = (e) => {
    setFocus(false);
    setStatusCondition(e);
    // setReceptions(receptions.filter((ev)=>ev.status=== e.target.innerText))
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
            onClick={() => setStatusCondition('')}
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
              {receptions.length}
            </span>
          </ToggleButton>
          {conditionList.map((e, i) => (
            <div key={i} className="">
              <ToggleButton color="info" onClick={() => filterHandler(e)} className="focus:bg-slate-200" value={e}>
                <div className="px-2">
                  <span>{e}</span>
                </div>
                <span className="w-8 h-8 bg-[#b0b0b0] text-white rounded-lg flex justify-center items-center">
                  {receptions.filter((rec) => rec.status === conditionList[i]).length}
                </span>
              </ToggleButton>
            </div>
          ))}
        </ToggleButtonGroup>
      </Stack>
    </>
  );
}
