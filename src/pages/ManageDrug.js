import { Container } from '@mui/material';
import Page from '../components/Page';
import useSettings from '../hooks/useSettings';
import MainPageManageDrug from '../components/ManageDrug/MainPageManageDrug';
// ----------------------------------------------------------------------

export default function ManageDrug() {
  const { themeStretch } = useSettings();
  return (
    <>
      <Page title="مدیریت دارو">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <MainPageManageDrug />
        </Container>
      </Page>
    </>
  );
}
