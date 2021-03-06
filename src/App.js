import {Container} from '@mui/material';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import {MediaProvider} from './contexts/MediaContext';
import Home from './views/Home';
import Login from './views/Login';
import Logout from './views/Logout';
import Profile from './views/Profile';
import Single from './views/Single';
import SingleContact from './views/SingleContact';
import {themeOptions} from './theme/themeOptions';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import Upload from './views/Upload';
import Offers from './views/Offers';
import MyFiles from './views/MyFiles';
import Modify from './views/Modify';

const theme = createTheme(themeOptions);

const App = () => {
  return (
    // eslint-disable-next-line no-undef
    <Router basename={process.env.PUBLIC_URL}>
      <MediaProvider>
        <ThemeProvider theme={theme}>
          <Container maxWidth="lg" id="container">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/single" element={<Single />} />
              <Route path="/contactsingle" element={<SingleContact />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/Offers" element={<Offers />} />
              <Route path="/MyFiles" element={<MyFiles />} />
              <Route path="/modify" element={<Modify />} />
            </Routes>
          </Container>
        </ThemeProvider>
      </MediaProvider>
    </Router>
  );
};

export default App;
