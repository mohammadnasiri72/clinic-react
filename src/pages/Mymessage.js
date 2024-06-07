import { Container } from '@mui/material';
import Page from '../components/Page';
import useSettings from '../hooks/useSettings';
import MainPageMyMessage from '../components/MyMessage/MainPageMyMessage';
// ----------------------------------------------------------------------

export default function Mymessage({ flagNotification, setFlagNotification, flagNotif, setFlagNotif }) {
  const { themeStretch } = useSettings();
  return (
    <>
      <Page title="پیغام های من">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <MainPageMyMessage
            flagNotification={flagNotification}
            setFlagNotification={setFlagNotification}
            flagNotif={flagNotif}
            setFlagNotif={setFlagNotif}
          />
        </Container>
      </Page>
    </>
  );
}
