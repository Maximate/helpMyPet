/* eslint-disable prettier/prettier */
import {useContext, useEffect, useState} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {useTag} from '../hooks/ApiHooks';
import {mediaUrl} from '../utils/variables';
import '../css/Home.css';
import '../backgrounds/bg.css';
import BackButton from '../components/BackButton';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Typography,
} from '@mui/material';

const Profile = () => {
  const {user} = useContext(MediaContext);
  const [avatar, setAvatar] = useState({
    filename: 'https://placekitten.com/320',
  });
  const {getTag} = useTag();

  const fetchAvatar = async () => {
    if (user) {
      const avatars = await getTag('avatar_' + user.user_id);
      const ava = avatars.pop();
      ava.filename = mediaUrl + ava.filename;
      setAvatar(ava);
    }
  };

  useEffect(() => {
    fetchAvatar();
  }, [user]);

  return (
    <div id="profileBG">
      <>
        <BackButton />
        <Container sx={{width: '100%'}}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              Width: "100%",
            }}
          >
            <Avatar
              alt="User profile picture"
              src={avatar.filename}
              sx={{
                width: '160px',
                height: '160px',
                border: '2px solid #EDAD3A',
              }}
            />
          </Box>
          <Typography sx={{textAlign: 'center', fontSize: '3rem', fontFamily: 'var(--HeadFont)'}}>
            {user.username}
          </Typography>
        </Container>
        <Card>
          <CardContent sx={{fontFamily: 'var(--HeadFont)'}}>
            <Typography>Email address: {user.email}<hr></hr></Typography>
            <Typography sx={{fontWeight: 'bold', fontSize: '1.2rem'}}>Description:</Typography>
            <Typography>{user.full_name}</Typography>
          </CardContent>
        </Card>
      </>
    </div>
  );
};

export default Profile;