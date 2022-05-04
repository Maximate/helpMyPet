/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { useLocation } from 'react-router-dom';
import { mediaUrl } from '../utils/variables';
import { useMedia } from '../hooks/ApiHooks';
import { Button } from '@mui/material';
import {Link} from 'react-router-dom';
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
import {MediaContext} from '../contexts/MediaContext';
import {useContext} from 'react';

const SingleContact = () => {
  const [avatar, setAvatar] = useState({});
  const {user} = useContext(MediaContext);
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
    display: 'block',
    width: '120px',
    height: '60px',
    backgroundColor: 'white',
    color: 'black',
    float: 'right',
    marginTop: '40px',
    borderRadius: '0',
    border: '2px solid var(--Blue)',
    fontFamily: 'var(--RegularFont)',
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
        'comment': user.email
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
    <>
      <BackButton />
      <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
      <Typography component="h1" variant="h2">
        {file.title}
      </Typography>

        <CardMedia
          component={file.media_type === 'image' ? 'img' : file.media_type}
          controls={true}
          poster={mediaUrl + file.screenshot}
          src={mediaUrl + file.filename}
          alt={file.title}
          sx={{
            borderRadius: '50%',
            height: '120px',
            width: '120px',
            border: '2px solid var(--Orange)',
          }}
        />
        </div>
        {/* //{description} */}
              <Card>
        <CardContent>
          <Typography>
            <text className='contactText'>
              Hi,<br />
              I would like to take care of your pet {file.title}.<br /><br />
              Check out and contact me:<br /><br />

              Account: <Button
              component={Link}
              to={'/profile'}
              >{user.username}</Button> <br />

              Email: {user.email}
            </text>
          </Typography>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar variant={'circle'} src={avatar.filename} />
              </ListItemAvatar>
              <Typography variant="subtitle2">{file.user_id}</Typography>

            </ListItem>
          </List>
        </CardContent>
      </Card>
      <Button style={registerToggle} onClick={() => {
                sendContact()
              }} >Send</Button>
    </>
  );
};

// TODO in the next task: add propType for location

export default SingleContact;
