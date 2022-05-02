/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import {CircularProgress, Grid} from '@mui/material';
import {useMedia} from '../hooks/ApiHooks';
// import {useWindowSize} from '../hooks/WindowHooks';
import MediaRow from './MediaRow';
import {useContext} from 'react';
import {MediaContext} from '../contexts/MediaContext';

const MediaTable = ({allFiles = true}) => {
  const {user} = useContext(MediaContext);
  const {mediaArray, loading, deleteMedia} = useMedia(allFiles, user?.user_id);
  // const windowSize = useWindowSize();
  console.log(mediaArray);
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
          {mediaArray.map((item, index) => {
            return (
              <MediaRow
                key={index}
                file={item}
                userId={user.user_id}
                deleteMedia={deleteMedia}
              />
            );
          })}
        </Grid>
      )}
    </>
  );
};

MediaTable.propTypes = {
  allFiles: PropTypes.bool,
};

export default MediaTable;
