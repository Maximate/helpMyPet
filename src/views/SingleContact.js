/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { useLocation } from 'react-router-dom';
import { mediaUrl } from '../utils/variables';
import { useMedia } from '../hooks/ApiHooks';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import { safeParseJson } from '../utils/functions';
import BackButton from '../components/BackButton';
import { useEffect, useState } from 'react';
import { useTag } from '../hooks/ApiHooks';
import { MediaContext } from '../contexts/MediaContext';
import { useContext } from 'react';
import ContactCard from '../components/ContactCard';

const SingleContact = () => {
  const [avatar, setAvatar] = useState({});
  const { user } = useContext(MediaContext);
  const { postComment, loading } = useMedia();
  const location = useLocation();
  console.log(location);
  const file = location.state.file;
  const { description, filters } = safeParseJson(file.description) || {
    description: file.description,
    filters: {
      brightness: 100,
      contrast: 100,
      saturation: 100,
      sepia: 0,
    },
  };

  const registerToggle = {
    width: '120px',
    height: '60px',
    backgroundColor: 'white',
    color: 'black',
    float: 'right',
    marginTop: '40px',
    borderRadius: '0',
    border: '2px solid var(--Blue)',
    fontFamily: 'var(--RegularFont)',
    textAlign: 'center',
    marginRight: '45px',
  };

  const { getTag } = useTag();

  const fetchAvatar = async () => {
    try {
      if (file) {
        const avatars = await getTag('avatar_' + file.user_id);
        const ava = avatars.pop();
        ava.filename = mediaUrl + ava.filename;
        setAvatar(ava);
        // hae kuvan pomistajan tiedot
      }
    } catch (err) {
      // console.log(err);
    }
  };

  const sendContact = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('stuff is', token, file.file_id)
      const params = new URLSearchParams({
        'file_id': file.file_id,
        'comment': JSON.stringify({ email: user.email, username: user.username })
      })
      const mediaData = await postComment(params, token);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchAvatar();
  }, []);

  console.log(avatar);

  return (
    <div id="contactsingleBG">
      <>
        <BackButton />
        <CardMedia
          component={file.media_type === 'image' ? 'img' : file.media_type}
          controls={true}
          poster={mediaUrl + file.screenshot}
          src={mediaUrl + file.filename}
          alt={file.title}
          sx={{
            borderRadius: '50%',
            height: '240px',
            width: '240px',
            border: '2px solid var(--Orange)',
            boxShadow: "7px 7px 15px #888",
            display: 'block',
            margin: 'auto',
            marginBottom: '40px',
          }}
        />
        <Typography sx={{ textAlign: 'center', fontFamily: 'var(--HeadFont)' }} component="h1" variant="h2">
          {file.title}
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5%' }} >
          <ContactCard userName={user.username} userEmail={user.email} file={file}></ContactCard></div>
        <Button style={registerToggle}
          component={Link} to={'/home'}
          onClick={() => {
            sendContact()
          }} >Send</Button>
      </>
    </div>
  );
};

// TODO in the next task: add propType for location

export default SingleContact;
