/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { mediaUrl } from '../utils/variables';
import contactText from '../views/SingleContact';
import { MediaContext } from '../contexts/MediaContext';
import { useContext } from 'react';
import
ContactCard from './ContactCard'; const CommentRow = ({ comment, userId, deleteMedia, files }) => {

  const [file, setFile] = useState(null)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const {user} = useContext(MediaContext);

  useEffect(() => {
    try {
      const jsonObject = JSON.parse(comment.comment)
      setEmail(jsonObject.email)
      setUsername(jsonObject.username)
    } catch (error) {
      console.log(error)
    }

    files.map((item, i) => {
      if (item.file_id == comment.file_id) {
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
      style={{
        minWidth: "100vw", padding: '5px', paddingLeft: '5%'
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
            height: '13vw',
            width: '13vw',
            border: '2px solid var(--Orange)',
            marginRight: '3%',
            boxShadow: "7px 7px 15px #888"
          }} /> {contactText}
        <ContactCard userName={username} userEmail={email} file={file}></ContactCard>
      </>}


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
