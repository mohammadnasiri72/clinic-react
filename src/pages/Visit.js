// @mui
import { Container } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import MainPageVisit from '../components/visit/MainPageVisit';

// ----------------------------------------------------------------------

export default function Visit({account}) {
  const { themeStretch } = useSettings();

  return (
    <Page title="ویزیت">
      <Container maxWidth={themeStretch ? false : 'xl'}>
      <MainPageVisit account={account}/>
      </Container>
    </Page>
  );
}
