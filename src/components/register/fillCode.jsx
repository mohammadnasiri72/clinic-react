import React, { createRef, useEffect, useRef, useState } from 'react';

export default function InputFillCode({ setCode , login}) {
  const inpCode = useRef(new Array(6).fill('').map(() => createRef()));
  const [valueInputCode, setValueInputCode] = useState(new Array(6).fill(''));
  let numberCode = '';
  const arrCode = valueInputCode;

  useEffect(() => {
    if (login) {
      inpCode.current[0].current.focus();
    }
  }, [inpCode]);
  const fillCodeHandler = (e, i) => {
    arrCode[i] = e.target.value.slice(0, 1);
    if (arrCode[i].match(/^[0-9]?$/)) {
      setValueInputCode([...arrCode]);
      if (i < 5) {
        inpCode.current[i + 1].current.focus();
      }
      if (valueInputCode[i] === '') {
        inpCode.current[i].current.focus();
      }
    } else {
      arrCode[i] = '';
      setValueInputCode(arrCode);
    }
    valueInputCode.map((e) => numCodHandler(e));
    setCode(numberCode);
  };
  function numCodHandler(e) {
    numberCode += e;
  }
  return (
    <>
      <div className=" mx-auto mt-4">
        <div className=" mx-auto mt-4">
          <h3 className="text-start lg:w-2/3 lg:px-0 px-5 w-full mx-auto">کد ارسال شده:</h3>
          <div className="flex mt-5 justify-center px-2 lg:w-3/4 sm:w-5/6 w-full mx-auto" dir="ltr">
            {new Array(6).fill().map((e, i) => (
              <div key={i} className="px-1 overflow-hidden ">
                <input
                  tabIndex={i + 1}
                  ref={inpCode.current[i]}
                  value={valueInputCode[i]}
                  onChange={(e) => fillCodeHandler(e, i)}
                  className="border-2 focus:border-green-500 border-gray-500  h-full w-full sm:w-14 sm:h-14 bg-slate-100 text-slate-600 text-3xl text-center outline-none p-2 rounded-lg"
                  type="text"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
