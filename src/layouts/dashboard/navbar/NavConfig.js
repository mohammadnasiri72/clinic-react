// components
import { CiHome, CiViewList } from 'react-icons/ci';
import { FaRegCalendarAlt, FaRegCalendarCheck, FaUserMd, FaUserNurse, FaUsers } from 'react-icons/fa';
import { LiaUserEditSolid } from 'react-icons/lia';
import { MdSupportAgent } from 'react-icons/md';
import { FiMessageCircle } from "react-icons/fi";
import { BsCapsulePill, BsClockHistory } from 'react-icons/bs';
import { GrServices } from "react-icons/gr";
import { FaUsersGear } from 'react-icons/fa6';
import { TbCalendarTime } from 'react-icons/tb';

// ----------------------------------------------------------------------





const sidebarConfig = [
  // General
  // ----------------------------------------------------------------------
  {
    subheader: 'General',
    items: [
      { title: 'صفحه اصلی', path: '/dashboard/home', icon: <CiHome /> },
      { title: 'ویرایش پروفایل', path: '/dashboard/updateProfile', icon: <LiaUserEditSolid /> },
      { title: 'پیام های من', path: '/dashboard/mymessage', icon: <FiMessageCircle /> },
    ],
  },
  // Patient
  // ----------------------------------------------------------------------
  {
    subheader: 'Patient',
    items: [
      { title: 'نوبت دهی اینترنتی', path: '/dashboard/reserve', icon: <FaRegCalendarCheck /> },
      { title: 'نوبت های من', path: '/dashboard/viewReservation', icon: <FaRegCalendarAlt /> },
      { title: 'تاریخچه بیماری‌ها', path: '/dashboard/sicknessList', icon: <CiViewList /> },
      { title: 'مشاوره آنلاین', path: '/dashboard/counseling', icon: <MdSupportAgent /> },
      { title: 'سابقه پذیرش', path: '/dashboard/historyVisit', icon: <BsClockHistory /> },
    ],
  },

  // Staff
  // ----------------------------------------------------------------------
  {
    subheader: 'Staff',
    items: [
      { title: 'لیست بیماران', path: '/dashboard/patientListStaff', icon: <FaUsers /> },
      { title: 'پذیرش', path: '/dashboard/reception', icon: <MdSupportAgent /> },
      { title: 'لیست نوبت ها', path: '/dashboard/reservHistory', icon: <CiViewList /> },
    ],
  },

  // Doctor
  // ----------------------------------------------------------------------
  {
    subheader: 'Doctor',
    items: [{ title: 'ویزیت', path: '/dashboard/visit', icon: <FaUserMd /> }],
  },
  // Admin
  // ----------------------------------------------------------------------
  {
    subheader: 'Admin',
    items: [
      { title: 'مدیریت دارو', path: '/dashboard/manageDrug', icon: <BsCapsulePill /> },
      { title: 'مدیریت خدمات', path: '/dashboard/manageServices', icon: <GrServices /> },
      { title: 'مدیریت پرسنل', path: '/dashboard/managStaff', icon: <FaUsersGear /> },
      { title: 'مدیریت پزشک', path: '/dashboard/managDoctor', icon: <FaUserNurse /> },
      { title: 'مدیریت رزرو', path: '/dashboard/managReserve', icon: <TbCalendarTime /> },
      { title: 'مدیریت اطلاعات پایه', path: '/dashboard/managInformation', icon: <MdSupportAgent /> },
      { title: 'مدیریت بیمه', path: '/dashboard/managInsuranceCompany', icon: <MdSupportAgent /> },
    ],
  },
 
];

export default sidebarConfig;
