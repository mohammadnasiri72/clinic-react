// @mui
import { Container } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import MainCounselingPage from '../components/Counseling/MainCounselingPage';
import Page from '../components/Page';

// ----------------------------------------------------------------------

export default function Counseling({account}) {
  const { themeStretch } = useSettings();

  return (
    <Page title="مشاوره آنلاین">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <MainCounselingPage account={account}/>
      </Container>
    </Page>
  );
}
