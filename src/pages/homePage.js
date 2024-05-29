import { useNavigate } from 'react-router';
// @mui
import { Container, Paper, Typography } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

export default function HomePage({account}) {
  const { themeStretch } = useSettings();

  const navigate = useNavigate()

  // go to reserve page
  const goToReserve = ()=>{
    navigate('/dashboard/reserve')
  }
  
  // go to counseling page
  const goToCounseling = ()=>{
    navigate('/dashboard/counseling')
  }
  
  // go to counseling page
  const goTosicknessList = ()=>{
    navigate('/dashboard/sicknessList')
  }
  
  
  // go to counseling page
  const goToUpdateProfile = ()=>{
    navigate('/dashboard/updateProfile')
  }
  

  // go to counseling page
  const goToViewReserve = ()=>{
    navigate('/dashboard/viewReservation')
  }



  return (
    <Page title="صفحه اصلی">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h4" component="h1" paragraph>
          <div className="text-start">
            <span> سلام </span>
            {account.firstName}
            <span> عزیز </span>
          </div>
        </Typography>
        <div className="flex flex-wrap justify-center">
          <div className="px-10 md:w-1/2 w-full flex">
            <Paper
             onClick={goToReserve}
              className="w-1/2 shadow-md hover:shadow-lg duration-300 border-[#0002] border rounded-2xl cursor-pointer">
              <div className="flex justify-center">
                <img className="w-40" src={'/images/nobat.png'} alt="" />
              </div>
              <span className="text-xl font-semibold">نوبت دهی اینترنتی</span>
            </Paper>
            <Paper
             onClick={goToViewReserve}
              className="w-1/2 shadow-md hover:shadow-lg duration-300 border-[#0002] border rounded-2xl cursor-pointer relative">
              <div className="flex justify-center">
                <img className="w-40" src={'/images/moshavere.png'} alt="" />
              </div>
              <span className="text-xl font-semibold">مشاهده نوبت های من</span>
            </Paper>
          </div>
          <div className="px-10 md:w-1/2 w-full flex md:mt-0 mt-5">
            <Paper
             onClick={goToCounseling}
              className="shadow-md hover:shadow-lg duration-300 border-[#0002] border rounded-2xl cursor-pointer w-full relative">
              <div className="flex justify-center">
                <img className="w-40" src={'/images/moshavere.png'} alt="" />
              </div>
              <span className="text-xl font-semibold ">مشاوره آنلاین</span>
            </Paper>
          </div>
        </div>
        <div className="flex flex-wrap justify-center mt-5">
          <div className="px-10 md:w-1/2 w-full">
            <Paper
             onClick={goTosicknessList}
              className="shadow-md hover:shadow-lg duration-300 border-[#0002] border rounded-2xl cursor-pointer">
              <div className="flex justify-center">
                <img className="w-40" src={'/images/nobat.png'} alt="" />
              </div>
              <span className="text-xl font-semibold">سابقه بیماری‌ها</span>
            </Paper>
          </div>
          <div className="px-10 md:w-1/2 w-full flex md:mt-0 mt-5">
            <Paper
             onClick={goToUpdateProfile}
              className="shadow-md hover:shadow-lg duration-300 border-[#0002] border rounded-2xl cursor-pointer w-full relative">
              <div className="flex justify-center">
                <img className="w-40" src={'/images/moshavere.png'} alt="" />
              </div>
              <span className="text-xl font-semibold">ویرایش پروفایل</span>
            </Paper>
          </div>
        </div>
      </Container>
    </Page>
  );
}
