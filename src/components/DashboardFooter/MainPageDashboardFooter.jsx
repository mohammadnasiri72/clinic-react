import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useEffect, useState } from 'react';
import { CiHome } from 'react-icons/ci';
import { MdOutlineSick, MdSupportAgent } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa6';
import { LiaUserEditSolid } from 'react-icons/lia';
import { useNavigate } from 'react-router';

export default function MainPageDashboardFooter() {
  const [valueButton, setValueButton] = useState('home');

    const navigate = useNavigate()
  

  return (
    // <div className="fixed bottom-0 left-0 right-0 h-20 border bg-white sm:hidden flex flex-wrap">
    //   <Stack direction="row">
    //     <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment} aria-label="text alignment">
    //       <ToggleButton sx={{width:'20%'}} value="home" aria-label="left aligned">
    //         <div className=" flex flex-col justify-center items-center">
    //           <CiHome className='text-xl text-slate-700'/>
    //           <Button
    //             sx={{
    //               fontSize: 12,
    //               color:'rgb(51 65 85)',
    //             }}
    //             className="whitespace-nowrap"
    //           >
    //             خانه
    //           </Button>
    //         </div>
    //       </ToggleButton>
    //       <ToggleButton sx={{width:'20%'}} value="home" aria-label="left aligned">
    //         <div className=" flex flex-col justify-center items-center">
    //           <CiHome className='text-xl text-slate-700'/>
    //           <Button
    //             sx={{
    //               fontSize: 12,
    //               color:'rgb(51 65 85)',
    //             }}
    //             className="whitespace-nowrap"
    //           >
    //             خانه
    //           </Button>
    //         </div>
    //       </ToggleButton>
    //       <ToggleButton sx={{width:'20%'}} value="home" aria-label="left aligned">
    //         <div className=" flex flex-col justify-center items-center">
    //           <CiHome className='text-xl text-slate-700'/>
    //           <Button
    //             sx={{
    //               fontSize: 12,
    //               color:'rgb(51 65 85)',
    //             }}
    //             className="whitespace-nowrap"
    //           >
    //             خانه
    //           </Button>
    //         </div>
    //       </ToggleButton>
    //       <ToggleButton sx={{width:'20%'}} value="home" aria-label="left aligned">
    //         <div className=" flex flex-col justify-center items-center">
    //           <CiHome className='text-xl text-slate-700'/>
    //           <Button
    //             sx={{
    //               fontSize: 12,
    //               color:'rgb(51 65 85)',
    //             }}
    //             className="whitespace-nowrap"
    //           >
    //             خانه
    //           </Button>
    //         </div>
    //       </ToggleButton>
    //       <ToggleButton sx={{width:'20%'}} value="home" aria-label="left aligned">
    //         <div className=" flex flex-col justify-center items-center">
    //           <CiHome className='text-xl text-slate-700'/>
    //           <Button
    //             sx={{
    //               fontSize: 12,
    //               color:'rgb(51 65 85)',
    //             }}
    //             className="whitespace-nowrap"
    //           >
    //             خانه
    //           </Button>
    //         </div>
    //       </ToggleButton>

    //     </ToggleButtonGroup>
    //   </Stack>
    // </div>
    <div style={{zIndex:'8798798798'}} className="fixed bottom-0 left-0 right-0 border border-[#0001] bg-white sm:hidden flex flex-wrap rounded-t-3xl">
      <div className="w-1/5 flex flex-col justify-center items-center">
        <Button
          onClick={() => {
            setValueButton('home')
            navigate('/dashboard/home')
          }}
          value={valueButton}
          sx={{
            fontSize: 12,
            color:valueButton==='home'? '#1ccaff' : '#0005',
          }}
          className="whitespace-nowrap flex flex-col h-full"
        >
          <CiHome className="text-3xl" />
          <span>خانه</span>
        </Button>
      </div>
      <div className="w-1/5 flex flex-col justify-center items-center">
        <Button
          onClick={() => {
            setValueButton('counseling')
            navigate('/dashboard/counseling')
          }}
          value={valueButton}
          sx={{
            fontSize: 12,
            color:valueButton==='counseling'? '#1ccaff' : '#0005',
          }}
          className="whitespace-nowrap flex flex-col h-full"
        >
          <MdSupportAgent className="text-3xl"/>
          <span className="">مشاوره آنلاین</span>
        </Button>
      </div>
      <div className="w-1/5 flex flex-col justify-center items-center">
        <Button
          onClick={() => {
            setValueButton('reserve')
            navigate('/dashboard/reserve')
          }}
          value={valueButton}
          sx={{
            fontSize: 12,
            backgroundColor: 'white',
            '&:hover': {
              backgroundColor: 'white',
            },
          }}
          className="whitespace-nowrap flex flex-col h-full"
        >
          <FaPlus className="text-5xl bg-teal-500 rounded-full text-white p-3 -translate-y-8 absolute" />
          <span className="mt-7">ثبت نوبت</span>
        </Button>
      </div>
      <div className="w-1/5 flex flex-col justify-center items-center">
        <Button
          onClick={() => {
            setValueButton('mySickness')
            navigate('/dashboard/sicknessList')
          }}
          value={valueButton}
          sx={{
            fontSize: 12,
            color:valueButton==='mySickness'? '#1ccaff' : '#0005',
          }}
          className="whitespace-nowrap flex flex-col h-full"
        >
          <MdOutlineSick className="text-3xl" />
          <span>بیماریهای من</span>
        </Button>
      </div>
      <div className="w-1/5 flex flex-col justify-center items-center">
        <Button
          onClick={() => {
            setValueButton('profile')
            navigate('/dashboard/updateProfile')
          }}
          value={valueButton}
          sx={{
            fontSize: 12,
            color:valueButton==='profile'? '#1ccaff' : '#0005',
          }}
          className=" whitespace-nowrap flex flex-col h-full"
        >
          <LiaUserEditSolid className="text-3xl" />
          <span>پروفایل</span>
        </Button>
      </div>
    </div>
  );
}
