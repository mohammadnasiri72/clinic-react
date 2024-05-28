import React from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { mainDomain } from '../../utils/mainDomain';

export default function BoxImg({ isShowImg, setIsShowImg, src, filesUpload, setSrc }) {
  const nextImgHandler = () => {
    const arr = filesUpload.filter((e) => e.medicalItemId === 4);
    let num = arr.indexOf(filesUpload.find((e) => e.attachmentSrc === src));
    if (num >= arr.length - 1) {
      num = -1;
    }
    setSrc(arr[num + 1].attachmentSrc);
  };
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
      <div style={{ zIndex: '9999999999' }}>
        <div
          style={{ display: isShowImg ? 'block' : 'none', zIndex: '9999999999' }}
          className="fixed top-0 bottom-0 right-0 left-0 bg-[#000a]"
        >
          <IoCloseSharp
            onClick={() => setIsShowImg(false)}
            className="absolute top-10 right-10 text-white cursor-pointer rounded-full bg-[#0002] p-3 text-5xl duration-300 hover:bg-[#0006]"
          />
          <FaChevronRight
            onClick={nextImgHandler}
            className="absolute top-1/2 right-10 text-white cursor-pointer rounded-full bg-[#0002] p-3 text-5xl duration-300 hover:bg-[#0006]"
          />
          <FaChevronLeft
            onClick={backImgHandler}
            className="absolute top-1/2 left-10 text-white cursor-pointer rounded-full bg-[#0002] p-3 text-5xl duration-300 hover:bg-[#0006]"
          />
        </div>
        <div
          style={{ transform: isShowImg ? 'scale(1)' : 'scale(0)', zIndex: '9999999999' }}
          className="fixed top-10 bottom-10 right-1/4 left-1/4 duration-300 border rounded-lg shadow-lg"
        >
          {src && (
            <a className="cursor-zoom-in" target="_blank" rel="noreferrer" href={mainDomain + src}>
              <img className="w-full h-full object-cover rounded-lg" src={mainDomain + src} alt="" />
            </a>
          )}
        </div>
      </div>
    </>
  );
}
