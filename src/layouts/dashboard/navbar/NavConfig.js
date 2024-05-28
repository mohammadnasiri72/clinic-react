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
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'بیمار',
    items: [
      { title: 'صفحه اصلی', path: '/dashboard/home', icon: ICONS.dashboard },
      { title: 'ویرایش پروفایل', path: '/dashboard/updateProfile', icon: <LiaUserEditSolid /> },
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
    subheader: 'staff',
    items: [
      { title: 'لیست بیماران', path: '/dashboard/patientListStaff', icon: <MdSupportAgent /> },
      { title: 'پذیرش', path: '/dashboard/reception', icon: <MdSupportAgent /> },
      // {
      //   title: 'user',
      //   path: '/dashboard/user',
      //   icon: <FaRegUser />,
      //   children: [
      //     { title: 'Four', path: '/dashboard/user/four' },
      //     { title: 'Five', path: '/dashboard/user/five' },
      //     { title: 'Six', path: '/dashboard/user/six' },
      //   ],
      // },
    ],
  },

  // Doctor
  // ----------------------------------------------------------------------
  {
    subheader: 'دکتر',
    items: [{ title: 'ویزیت', path: '/dashboard/visit', icon: <MdSupportAgent /> }],
  },
  // {
  //   subheader: 'management',
  //   items: [
  //     {
  //       title: 'منوی 5',
  //       path: '/dashboard/overMenu',
  //       icon: ICONS.user,
  //       children: [
  //         { title: 'زیرمنوی 1', path: '/dashboard/overMenu/one' },
  //         { title: 'زیرمنوی 2', path: '/dashboard/overMenu/two' },
  //         { title: 'زیرمنوی 3', path: '/dashboard/overMenu/three' },
  //       ],
  //     },
  //     { title: 'منوی 6', path: '/dashboard/five', icon: ICONS.analytics },
  //   ],
  // },
  {
    subheader: 'admin',
    items: [
      { title: 'مدیریت دارو', path: '/dashboard/manageDrug', icon: <MdSupportAgent /> },
      { title: 'مدیریت خدمات', path: '/dashboard/manageServices', icon: <MdSupportAgent /> },
      { title: 'مدیریت پرسنل', path: '/dashboard/managStaff', icon: <MdSupportAgent /> },
      { title: 'مدیریت پزشک', path: '/dashboard/managDoctor', icon: <MdSupportAgent /> },
      { title: 'مدیریت رزرو', path: '/dashboard/managReserve', icon: <MdSupportAgent /> },
      { title: 'مدیریت اطلاعات پایه', path: '/dashboard/managInformation', icon: <MdSupportAgent /> },
      { title: 'مدیریت بیمه', path: '/dashboard/managInsuranceCompany', icon: <MdSupportAgent /> },
    ]
  }
];

export default sidebarConfig;
