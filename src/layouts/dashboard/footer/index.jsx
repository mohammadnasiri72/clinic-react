import MainPageDashboardFooter from '../../../components/DashboardFooter/MainPageDashboardFooter';

export default function DashboardFooter() {
  return <>{localStorage.getItem('roles') === 'Patient' && <MainPageDashboardFooter />}</>;
}
