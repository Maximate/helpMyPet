/* eslint-disable prettier/prettier */
import {Grid} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import {mediaUrl} from '../utils/variables';
import contactText from '../views/SingleContact';

const CommentRow = ({comment, userId, deleteMedia, files}) => {

  const [file, setFile] = useState(null)

useEffect(() => {
	files.map((item,i) =>{
    if(item.file_id == comment.file_id){
      setFile(item);
    }
  })
}, []);

  return (
    <Grid
      container
      key={comment.comment_id}
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      style={{minWidth: "100vw", padding: '5px'
    }}
    >
      {file == null ? <>Loading image </> : <>
      <img
        src={file.thumbnails ? mediaUrl + file.thumbnails.w320 : 'logo512.png'
      }
        alt={file.title}
        loading="fast"
        style={{
          borderRadius: '50%',
          height: '120px',
          width: '120px',
          border: '2px solid var(--Orange)',
        }}
      /> {file.title} {contactText}</>}


    </Grid>
  );
};

CommentRow.propTypes = {
  comment: PropTypes.object,
  userId: PropTypes.number,
  deleteMedia: PropTypes.func,
  files: PropTypes.array,
};

export default CommentRow;
