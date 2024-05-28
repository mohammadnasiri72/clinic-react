// @mui
import { Container, Typography } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

export default function HomePage({account}) {
  const { themeStretch } = useSettings();

  return (
    <Page title="homePage">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h4" component="h1" paragraph>
          <div className="text-start">
            <span> سلام </span>
            {account.firstName}
            <span> عزیز </span>
          </div>
        </Typography>
        <div className="flex flex-wrap justify-center">
          <div className="px-10 md:w-1/2 w-full">
            <div
            //  onClick={goToReserve}
              className="shadow-md hover:shadow-lg duration-300 border-[#0002] border rounded-2xl cursor-pointer">
              <div className="flex justify-center">
                <img className="w-40" src={'/images/nobat.png'} alt="" />
              </div>
              <span className="text-xl font-semibold">نوبت دهی اینترنتی</span>
            </div>
          </div>
          <div className="px-10 md:w-1/2 w-full flex md:mt-0 mt-5">
            <div
            //  onClick={goToCounseling}
              className="shadow-md hover:shadow-lg duration-300 border-[#0002] border rounded-2xl cursor-pointer w-full relative">
              <div className="flex justify-center">
                <img className="w-40" src={'/images/moshavere.png'} alt="" />
              </div>
              <span className="text-xl font-semibold ">مشاوره آنلاین</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center mt-5">
          <div className="px-10 md:w-1/2 w-full">
            <div
            //  onClick={goTosicknessList}
              className="shadow-md hover:shadow-lg duration-300 border-[#0002] border rounded-2xl cursor-pointer">
              <div className="flex justify-center">
                <img className="w-40" src={'/images/nobat.png'} alt="" />
              </div>
              <span className="text-xl font-semibold">سابقه بیماری‌ها</span>
            </div>
          </div>
          <div className="px-10 md:w-1/2 w-full flex md:mt-0 mt-5">
            <div
            //  onClick={goToUpdateProfile}
              className="shadow-md hover:shadow-lg duration-300 border-[#0002] border rounded-2xl cursor-pointer w-full relative">
              <div className="flex justify-center">
                <img className="w-40" src={'/images/moshavere.png'} alt="" />
              </div>
              <span className="text-xl font-semibold">ویرایش پروفایل</span>
            </div>
          </div>
        </div>
      </Container>
    </Page>
  );
}
