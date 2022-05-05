import {Typography} from '@mui/material';
import BackButton from '../components/BackButton';
import MediaTable from '../components/MediaTable';

const Offers = () => {
  return (
    <>
      <BackButton />
      <Typography component="h1" variant="h2">
        MyPets
      </Typography>
      <MediaTable allFiles={false} />
    </>
  );
};

export default Offers;
