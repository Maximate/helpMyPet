/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import {CircularProgress, Grid} from '@mui/material';
import {useMedia} from '../hooks/ApiHooks';
// import {useWindowSize} from '../hooks/WindowHooks';
import MediaRow from './MediaRow';
import {useContext} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import CommentRow from './CommentRow';

const CommentTable = ({allFiles = true}) => {
  const {user} = useContext(MediaContext);
  const {commentArray, loading, mediaArray} = useMedia(allFiles, user?.user_id);
  // const windowSize = useWindowSize();
  console.log(commentArray)
  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid
          variant="masonry"
          // sx={{width: 500, height: 450}} cols={1} rowHeight={164}
          // cols={windowSize.width > 768 ? 3 : 1}
          // > 768 ? 3 : 2
          gap={8}
        >
          {commentArray.map((item, index) => {
            console.log('item', item)
            return (
              <CommentRow
              comment={item}
              key={index}
              userId={user.user_id}
              files={mediaArray}
              />
            );
          })}
        </Grid>
      )}
    </>
  );
};

CommentTable.propTypes = {
  allFiles: PropTypes.bool,
};

export default CommentTable;
