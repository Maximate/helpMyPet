/* eslint-disable prettier/prettier */
import MediaTable from '../components/MediaTable';
import {Typography} from '@mui/material';
import Map from '../components/Map';
import Nav from '../components/Nav';
import '../css/Home.css';

const Home = () => {
const markers = [[60.2176171, 24.8070349]]
// ,[60.210, 24.808],[60.200, 24.803]

  return (
    <>
      <Typography component="h1" variant="h2">
      <Nav />
        <div style={{display: "flex", justifyContent: "center", width: "100vw"}}>
        <Map markers={markers}></Map>
        </div>
      </Typography>
      <MediaTable />
      </>
  );
};

export default Home;
