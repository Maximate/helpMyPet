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
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Button,
} from '@mui/material';
import {Link} from 'react-router-dom';

const ContactCard = ({userName, userEmail, file}) => {
  return (
    <>
      <Card style={{width: '50vw', borderRadius: '0', boxShadow: "7px 7px 15px #888",
    marginBottom: '2%'}}>
        <CardContent>
          <Typography sx={{fontFamily: 'var(--RegularFont)'}}>
            <p className="contactText">
              Hi,
              <br />I would like to take care of your pet {file.title}.<br />
              <br />
              Check out and contact me:
              <br />
              <br />
              Account: {userName}
              <Button component={Link} to={'/profile'}>
                {userName}
              </Button>{' '}
              <br />
              Email: {userEmail}
            </p>
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

ContactCard.propTypes = {
  userName: PropTypes.string,
  userEmail: PropTypes.string,
  file: PropTypes.object,
};

export default ContactCard;
