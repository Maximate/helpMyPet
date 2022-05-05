/* eslint-disable prettier/prettier */
import {Button, Grid, ImageListItemBar} from '@mui/material';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {mediaUrl} from '../utils/variables';
import {safeParseJson} from '../utils/functions';

const MediaRow = ({file, userId, deleteMedia}) => {
  const doDelete = () => {
    const ok = confirm('Do juu delte?');
    if (ok) {
      try {
        deleteMedia(file.file_id, localStorage.getItem('token'));
      } catch (err) {
        // console.log(err);
      }
    }
  };

  const {description, filters} = safeParseJson(file.description) || {
    description: file.description,
    filters: {
      brightness: 100,
      contrast: 100,
      saturation: 100,
      sepia: 0,
    },
  };

  return (
    <Grid
      container
      key={file.file_id}
      direction="row"
      alignItems="center"
      style={{maxWidth: "100vw", minWidth: "100vw", justifyContent: "center", padding: '5px',}}
    >

      <img
        src={file.thumbnails ? mediaUrl + file.thumbnails.w320 : 'logo512.png'}
        alt={file.title}
        loading="fast"
        style={{
          filter: `
        brightness(${filters.brightness}%)
        contrast(${filters.contrast}%)
        saturate(${filters.saturation}%)
        sepia(${filters.sepia}%)`,
        borderRadius: '50%',
        height: '13vw',
        width: '13vw',
        border: '2px solid var(--Orange)',
        marginRight: '3%'
               }}
      />
      <ImageListItemBar
        position="below"
        style={{borderBottom: '2px solid var(--Orange)',
        minWidth: '60vw'}}
        actionIcon={
          <>
          <div style={{display: "flex"}}>
            <Button
              variant="contained"
              component={Link}
              to={'/single'}
              state={{file}}
              style={{background: "white"}}
            >

              View
            </Button>
            {userId === file.user_id && (
              <>
                <Button
                  variant="contained"
                  component={Link}
                  to={'/modify'}
                  state={{file}}
                >
                  Edit
                </Button>
                <Button variant="contained" onClick={doDelete}>
                  Delete
                </Button>
              </>

            )}
            </div>
          </>
        }
        title={file.title}
        subtitle={description}
      />
    </Grid>
  );
};

MediaRow.propTypes = {
  file: PropTypes.object,
  userId: PropTypes.number,
  deleteMedia: PropTypes.func,
};

export default MediaRow;
