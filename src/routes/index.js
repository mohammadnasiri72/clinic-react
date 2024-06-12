import { Suspense, lazy, useEffect, useState } from 'react';
import { Navigate, useRoutes, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// components
import LoadingScreen from '../components/LoadingScreen';
import Register from '../pages/registerPage';
import MainLoginPage from '../components/login/mainLoginPage';
import { mainDomain } from '../utils/mainDomain';
import HomePage from '../pages/homePage';
import UpdateProfile from '../pages/updateProfile';
import MainPageReserve from '../pages/reserve';
import ViewReservation from '../pages/myReservation';
import SicknessList from '../pages/SicknessList';
import Counseling from '../pages/Counseling';
import HistoryVisit from '../pages/HistoryVisit';
import Visit from '../pages/Visit';
import PatientListStaff from '../pages/PatientListStaff';
import Reception from '../pages/Reception';
import ManageDrug from '../pages/ManageDrug';
import ManageServices from '../pages/ManageServices';
import ManagStaff from '../pages/ManagStaff';
import ManagDoctor from '../pages/ManagDoctor';
import ManagReserve from '../pages/ManagReserve';
import ManagInformation from '../pages/ManagInformation';
import ManagInsuranceCompany from '../pages/ManagInsuranceCompany';
import Mymessage from '../pages/Mymessage';
import ReservHistory from '../pages/ReservHistory';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  const [account, setAccount] = useState('');
  const [change, setChang] = useState(false);
  const [flagNotif, setFlagNotif] = useState(false);
  const [changeStatePages , setChangeStatePages] = useState(false)

  const url = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let role = localStorage.getItem('roles') ? localStorage.getItem('roles') : 'patient';
    if (role.includes('Doctor')) {
      role = 'Doctor';
    }else if (role.includes('Staff')) {
      role = 'Staff';
    }

    const token = localStorage.getItem('token');
    if (!token) {
      if (url.pathname.includes('/dashboard')) {
        navigate('/login');
      }
    } else {
      axios
        .get(`${mainDomain}/api/${role}/Get`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setAccount(res.data);
          } else {
            navigate('/login');
          }
        })
        .catch(() => {
          if (url.pathname.includes('/dashboard')) {
            navigate('/login');
          }
        });
    }
  }, [url, change, navigate]);

  return useRoutes([
    {
      path: '/',
      element: localStorage.getItem('token') ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/login',
      element: <MainLoginPage />,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout setChangeStatePages={setChangeStatePages} account={account} flagNotif={flagNotif} setFlagNotif={setFlagNotif} />,
      children: [
        { element: <Navigate to="/dashboard/home" replace />, index: true },
        { path: 'home', element: <HomePage account={account} /> },
        {
          path: 'updateProfile',
          element: <UpdateProfile account={account} setChang={setChang} />,
        },
        { path: 'reserve', element: <MainPageReserve account={account} /> },
        { path: 'viewReservation', element: <ViewReservation account={account} /> },
        { path: 'sicknessList', element: <SicknessList /> },
        { path: 'counseling', element: <Counseling account={account} changeStatePages={changeStatePages}/> },
        { path: 'historyVisit', element: <HistoryVisit account={account} changeStatePages={changeStatePages}/> },
        { path: 'visit', element: <Visit account={account} /> },
        { path: 'patientListStaff', element: <PatientListStaff account={account} /> },
        { path: 'reception', element: <Reception account={account} /> },
        { path: 'reservHistory', element: <ReservHistory /> },
        { path: 'manageDrug', element: <ManageDrug /> },
        { path: 'manageServices', element: <ManageServices /> },
        { path: 'managStaff', element: <ManagStaff /> },
        { path: 'managDoctor', element: <ManagDoctor /> },
        { path: 'managReserve', element: <ManagReserve /> },
        { path: 'managInformation', element: <ManagInformation /> },
        { path: 'managInsuranceCompany', element: <ManagInsuranceCompany /> },
        { path: 'mymessage', element: <Mymessage flagNotif={flagNotif} setFlagNotif={setFlagNotif} /> },
      ],
    },
    // {
    //   path: '/register',
    //   element:
    // },
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// Dashboard

const NotFound = Loadable(lazy(() => import('../pages/Page404')));
