import React, { useEffect } from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { mainDomain } from '../../utils/mainDomain';
import Page from '../Page';

export default function BoxImg({ isShowImg, setIsShowImg, src, filesUpload, setSrc }) {
  const nextImgHandler = () => {
    const arr = filesUpload.filter((e) => e.medicalItemId === 4);
    let num = arr.indexOf(filesUpload.find((e) => e.attachmentSrc === src));
    if (num >= arr.length - 1) {
      num = -1;
    }
    setSrc(arr[num + 1].attachmentSrc);
  };
  useEffect(() => {
    if (isShowImg) {
      document.body.style.overflowY = 'hidden';
    } else if (!isShowImg) {
      document.body.style.overflowY = 'auto';
    }
  }, [isShowImg]);
  const backImgHandler = () => {
    const arr = filesUpload.filter((e) => e.medicalItemId === 4);
    let num = arr.indexOf(filesUpload.find((e) => e.attachmentSrc === src));
    if (num <= 0) {
      num = arr.length;
    }
    setSrc(arr[num - 1].attachmentSrc);
  };
  return (
    <>
      <div style={{ zIndex: '99999998998989999' }}>
        <Page
        onClick={() => setIsShowImg(false)}
          style={{ display: isShowImg ? 'block' : 'none', zIndex: '9999999999' }}
          className="fixed top-0 bottom-0 right-0 left-0 bg-[#000a]"
        />

        <div
          style={{ transform: isShowImg ? 'scale(1)' : 'scale(0)', zIndex: '9999999999' }}
          className="fixed top-[10vh] bottom-[20vh] right-2 lg:right-1/4 left-2 lg:left-1/4 duration-300 border rounded-lg shadow-lg"
        >
          {src && (
            <a className="cursor-zoom-in" target="_blank" rel="noreferrer" href={mainDomain + src}>
              <img className="w-full h-full object-cover rounded-lg" src={mainDomain + src} alt="" />
            </a>
          )}
          <IoCloseSharp
            onClick={() => setIsShowImg(false)}
            className="absolute top-0 right-0 text-white cursor-pointer rounded-full bg-[#0009] p-3 text-5xl duration-300 hover:bg-[#000c]"
          />
          <FaChevronRight
            onClick={nextImgHandler}
            style={{ zIndex: '999999999999999999999' }}
            className="absolute top-1/2 right-0 text-white cursor-pointer rounded-full bg-[#0009] p-3 text-5xl duration-300 hover:bg-[#000c]"
          />
          <FaChevronLeft
            onClick={backImgHandler}
            className="absolute top-1/2 left-0 text-white cursor-pointer rounded-full bg-[#0009] p-3 text-5xl duration-300 hover:bg-[#000c]"
          />
        </div>
      </div>
    </>
  );
}
