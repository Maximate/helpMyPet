import {useLocation} from 'react-router-dom';
import {mediaUrl} from '../utils/variables';
import {Button} from '@mui/material';
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
import {safeParseJson} from '../utils/functions';
import BackButton from '../components/BackButton';
import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useTag} from '../hooks/ApiHooks';

const Single = () => {
  const [avatar, setAvatar] = useState({});
  const location = useLocation();
  console.log(location);
  const file = location.state.file;
  const {description} = safeParseJson(file.description) || {
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
    width: '100px',
    height: '50px',
    backgroundColor: 'white',
    color: 'black',
    float: 'right',
    marginTop: '40px',
    borderRadius: '0px',
    border: '2px solid var(--Blue)',
    fontFamily: 'var(--RegularFont)',
    marginRight: '45px',
  };

  const {getTag} = useTag();

  const fetchAvatar = async () => {
    try {
      if (file) {
        const avatars = await getTag('avatar_' + file.user_id);
        const ava = avatars.pop();
        ava.filename = mediaUrl + ava.filename;
        setAvatar(ava);
      }
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    fetchAvatar();
  }, []);

  console.log(avatar);

  return (
    <div id="contactBG">
      <>
        <BackButton />
        <div
          style={{
            display: 'block',
            textAlign: 'center',
          }}
        >
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
              margin: 'auto',
              marginBottom: '20px',
            }}
          />
          <Typography
            component="h1"
            variant="h2"
            style={{fontFamily: 'var(--HeadFont)', display: 'block'}}
          >
            {file.title}
          </Typography>
        </div>
        <Card>
          <CardContent>
            <Typography>{description}</Typography>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar variant={'circle'} src={avatar.filename} />
                </ListItemAvatar>
                <Typography variant="subtitle2">Käyttäjä 1</Typography>
              </ListItem>
            </List>
          </CardContent>
        </Card>
        <Button
          style={registerToggle}
          component={Link}
          variant="contained"
          to="/contactsingle"
          state={{file}}
        >
          Contact
        </Button>
      </>
    </div>
  );
};

// TODO in the next task: add propType for location

export default Single;
