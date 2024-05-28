import React from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { mainDomain } from '../../utils/mainDomain';

export default function BoxVideo({ srcVideo, isShowVideo, setIsShowVideo }) {
  return (
    <>
      <div
        style={{ display: isShowVideo ? 'block' : 'none', zIndex: '9999999999' }}
        className="fixed top-0 bottom-0 right-0 left-0 bg-[#000a]"
      >
        <IoCloseSharp
          onClick={() => setIsShowVideo(false)}
          className="fixed top-10 right-10 bottom-10 left-10 text-white cursor-pointer rounded-full bg-[#0002] p-3 text-5xl duration-300 hover:bg-[#0006]"
        />
      </div>
      <div
        style={{ transform: isShowVideo ? 'scale(1)' : 'scale(0)', zIndex: '9999999999' }}
        className="fixed top-10 bottom-10 right-1/4 left-1/4 duration-300  rounded-lg shadow-lg cursor-pointer flex items-center"
      >
        {srcVideo && (
          <video className="w-full h-full bg-black" src={mainDomain + srcVideo} controls> 
            <track kind="captions"/>
          </video>
        )}
      </div>
    </>
  );
}
