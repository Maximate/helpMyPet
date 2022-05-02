import {useContext, useEffect, useState} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {useTag} from '../hooks/ApiHooks';
import {mediaUrl} from '../utils/variables';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import BackButton from '../components/BackButton';

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
    <>
      <BackButton />
      <Container sx={{width: '100%'}}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
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
        <Typography sx={{textAlign: 'center', fontSize: '3rem'}}>
          {user.username}
        </Typography>
      </Container>
      {user && (
        <Card>
          <CardContent>
            <List>
              <ListItem>
                <ListItemText primary={user.email} />
              </ListItem>
              <ListItem>
                <ListItemText primary={user.full_name} />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Profile;
