import {Typography} from '@mui/material';
import BackButton from '../components/BackButton';
import MediaTable from '../components/MediaTable';

const Offers = () => {
  return (
    <div id="mypetsBG">
      <>
        <BackButton />
        <Typography
          component="h1"
          variant="h2"
          style={{textAlign: 'center', margin: '40px'}}
        >
          MyPets
        </Typography>
        <MediaTable allFiles={false} />
      </>
    </div>
  );
};

export default Offers;
