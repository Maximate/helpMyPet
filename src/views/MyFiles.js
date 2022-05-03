import MediaTable from '../components/MediaTable';
import {Typography} from '@mui/material';
import BackButton from '../components/BackButton';

const MyFiles = () => {
  return (
    <>
      <BackButton />
      <Typography component="h1" variant="h2">
        Offers
      </Typography>
      <MediaTable allFiles={true} />
    </>
  );
};

export default MyFiles;
