import { Container } from '@mui/material';
import Page from '../components/Page';
import useSettings from '../hooks/useSettings';
import MainPageMyMessage from '../components/MyMessage/MainPageMyMessage';
// ----------------------------------------------------------------------

export default function Mymessage({ flagNotification, setFlagNotification }) {
  const { themeStretch } = useSettings();
  return (
    <>
      <Page title="view reservation">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <MainPageMyMessage flagNotification={flagNotification} setFlagNotification={setFlagNotification} />
        </Container>
      </Page>
    </>
  );
}
