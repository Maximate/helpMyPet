import {Typography} from '@mui/material';
import BackButton from '../components/BackButton';
import CommentTable from '../components/CommentTable';

const Offers = () => {
  return (
    <div id="offerpageBG">
      <>
        <BackButton />
        <Typography component="h1" variant="h2">
          Offers
        </Typography>
        <CommentTable allFiles={false} />
      </>
    </div>
  );
};

export default Offers;
