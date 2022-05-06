import {Typography} from '@mui/material';
import BackButton from '../components/BackButton';
import CommentTable from '../components/CommentTable';

const Offers = () => {
  return (
    <>
      <BackButton />
      <Typography
        component="h1"
        variant="h2"
        // eslint-disable-next-line prettier/prettier
        style={{fontFamily: 'var(--HeadFont)', display: 'center', textAlign: 'center'}}
      >
        Offers
      </Typography>
      <CommentTable allFiles={false} />
    </>
  );
};

export default Offers;
