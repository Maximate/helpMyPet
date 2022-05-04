import {Typography} from '@mui/material';
import BackButton from '../components/BackButton';
import CommentTable from '../components/CommentTable';

const MyFiles = () => {
  return (
    <>
      <BackButton />
      <Typography component="h1" variant="h2">
        Offers
      </Typography>
      <CommentTable allFiles={false} />
    </>
  );
};

export default MyFiles;
