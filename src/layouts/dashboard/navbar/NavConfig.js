// components
import { CiViewList } from 'react-icons/ci';
import { FaRegCalendarAlt, FaRegCalendarCheck, FaRegUser } from 'react-icons/fa';
import { LiaUserEditSolid } from 'react-icons/lia';
import { MdSupportAgent } from 'react-icons/md';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  user: getIcon('ic_user'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
};

const sidebarConfig = [
  // General
  // ----------------------------------------------------------------------
  {
    subheader: 'General',
    items: [
      { title: 'صفحه اصلی', path: '/dashboard/home', icon: ICONS.dashboard },
      { title: 'ویرایش پروفایل', path: '/dashboard/updateProfile', icon: <LiaUserEditSolid /> },
      { title: 'پیام های من', path: '/dashboard/mymessage', icon: <MdSupportAgent /> },
    ],
  },
  // Patient
  // ----------------------------------------------------------------------
  {
    subheader: 'Patient',
    items: [
      { title: 'نوبت دهی اینترنتی', path: '/dashboard/reserve', icon: <FaRegCalendarCheck /> },
      { title: 'نوبت های من', path: '/dashboard/viewReservation', icon: <FaRegCalendarAlt /> },
      { title: 'لیست بیماری های من', path: '/dashboard/sicknessList', icon: <CiViewList /> },
      { title: 'مشاوره آنلاین', path: '/dashboard/counseling', icon: <MdSupportAgent /> },
      { title: 'سابقه پذیرش', path: '/dashboard/historyVisit', icon: <MdSupportAgent /> },
    ],
  },

  // Staff
  // ----------------------------------------------------------------------
  {
    subheader: 'Staff',
    items: [
      { title: 'لیست بیماران', path: '/dashboard/patientListStaff', icon: <MdSupportAgent /> },
      { title: 'پذیرش', path: '/dashboard/reception', icon: <MdSupportAgent /> },
    ],
  },

  // Doctor
  // ----------------------------------------------------------------------
  {
    subheader: 'Doctor',
    items: [{ title: 'ویزیت', path: '/dashboard/visit', icon: <MdSupportAgent /> }],
  },
  // Admin
  // ----------------------------------------------------------------------
  {
    subheader: 'Admin',
    items: [
      { title: 'مدیریت دارو', path: '/dashboard/manageDrug', icon: <MdSupportAgent /> },
      { title: 'مدیریت خدمات', path: '/dashboard/manageServices', icon: <MdSupportAgent /> },
      { title: 'مدیریت پرسنل', path: '/dashboard/managStaff', icon: <MdSupportAgent /> },
      { title: 'مدیریت پزشک', path: '/dashboard/managDoctor', icon: <MdSupportAgent /> },
      { title: 'مدیریت رزرو', path: '/dashboard/managReserve', icon: <MdSupportAgent /> },
      { title: 'مدیریت اطلاعات پایه', path: '/dashboard/managInformation', icon: <MdSupportAgent /> },
      { title: 'مدیریت بیمه', path: '/dashboard/managInsuranceCompany', icon: <MdSupportAgent /> },
    ],
  },
];

export default sidebarConfig;
