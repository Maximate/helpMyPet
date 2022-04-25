/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import {
  Box,
  Drawer,
  Fab,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MediaContext } from '../contexts/MediaContext';
import { useUser } from '../hooks/ApiHooks';
import { Home, AccountCircle, CloudUpload, Folder } from '@mui/icons-material';

const Nav = () => {
  const { user, setUser } = useContext(MediaContext);
  const [open, setOpen] = useState(false);
  const { getUser } = useUser();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const userData = await getUser(localStorage.getItem('token'));
      console.log(userData);
      setUser(userData);
    } catch (err) {
      setUser(null);
      navigate('/');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  console.log(user, open);

  return (
    <Box>
      <Fab
      style={{marginTop: "5%"}}
      onClick={() => {
        setOpen(!open);
      }}>
        <MenuIcon />
      </Fab>
      <Drawer
        open={open}
        onClose={() => {
          setOpen(!open);
        }}
      >
        <List
          onClick={() => {
            setOpen(!open);
          }}
        >
          <ListItemButton component={Link} to={'/home'}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
          {user && (
            <>
              <ListItemButton component={Link} to="/profile">
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
              <ListItemButton component={Link} to="/upload">
                <ListItemIcon>
                  <CloudUpload />
                </ListItemIcon>
                <ListItemText primary="Upload" />
              </ListItemButton>
              <ListItemButton component={Link} to="/myfiles">
                <ListItemIcon>
                  <Folder />
                </ListItemIcon>
                <ListItemText primary="My Files" />
              </ListItemButton>
            </>
          )}
        </List>
      </Drawer>
    </Box>
  );
};

export default Nav;
