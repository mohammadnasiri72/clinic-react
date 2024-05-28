// @mui
import { Container, Typography } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import Reserve from '../components/reserve/reserve';

// ----------------------------------------------------------------------

export default function MainPageReserve({account}) {
  const { themeStretch } = useSettings();

  return (
    <Page title="Reserve">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          نوبت دهی آنلاین
        </Typography>
        <Reserve account={account}/>
      </Container>
    </Page>
  );
}
