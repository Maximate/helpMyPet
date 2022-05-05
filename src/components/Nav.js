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
import snake from '../assets/snake.svg'
import logo from '../assets/logo-drawer.svg'
import MenuIcon from '@mui/icons-material/Menu';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MediaContext } from '../contexts/MediaContext';
import { useUser } from '../hooks/ApiHooks';
import { Home, AccountCircle, CloudUpload, Folder, } from '@mui/icons-material';
import PetsIcon from '@mui/icons-material/Pets';


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

  const iconStyle = { fontSize: "5vw"};
  const iconCircule = {
    display: "inline-block", borderRadius: "60px",
    boxShadow: "7px 7px 15px #888", padding: "0.5em 0.6em", marginRight: "5vw", marginLeft: "10vw"
  };
  const font = {familyFont: 'var(--HeadFont) !important'};

  return (
    <Box >
      <Fab
        style={{ marginTop: "5%", border: '2px solid var(--Blue)', backgroundColor: 'white'}}
        onClick={() => {
          setOpen(!open);
        }}>
        <MenuIcon fontSize="large" />
      </Fab>
      <Drawer
        open={open}
        onClose={() => {
          setOpen(!open);
        }}
      >
        {/* <img src={snake} alt="snake"
        style={{width: 100, height: 100}}></img> */}
        <img src={logo} alt="Logo"
          style={{ display: "block", marginLeft: "27vw", width: "36vw", marginTop: "15vh" }} />
        <List
          style={{ marginTop: "5%", width: "80vw", marginBottom: '10%' }}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <ListItemButton component={Link} to="/profile">
            <ListItemIcon>
              <div style={iconCircule}>
                <AccountCircle style={iconStyle} />
              </div>
            </ListItemIcon>
            <ListItemText style={{fontFamily: 'var(--HeadFont)'}} primary="Me" />
          </ListItemButton>

          <ListItemButton component={Link} to="/Offers">
            <ListItemIcon>
              <div style={iconCircule}>
                <Folder style={iconStyle} />
              </div>
            </ListItemIcon>
            <ListItemText primary="Offers" />
          </ListItemButton>

          <ListItemButton component={Link} to={'/home'}>
            <ListItemIcon>
              <div style={iconCircule}>
                <Home style={iconStyle} />
              </div>
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>

          <ListItemButton component={Link} to={'/MyFiles'}>
            <ListItemIcon>
              <div style={iconCircule}>
                <PetsIcon style={iconStyle} />
              </div>
            </ListItemIcon>
            <ListItemText primary="My Pets" />
          </ListItemButton>
          {user && (
            <>

            </>
          )}
        </List>

        <div style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <ListItemButton component={Link} to="/upload" style={{display: 'flex', flexDirection: 'column'}}>
            <ListItemIcon>
              <div style={{display: "inline-block", borderRadius: "60px",
                boxShadow: "7px 7px 15px #888", padding: "0.5em 0.6em", marginBottom: '20%'}}>
                <CloudUpload style={iconStyle} />
              </div>
            </ListItemIcon>
            <ListItemText primary="New Pet" />
          </ListItemButton>
        </div>

      </Drawer>
    </Box>
  );
};

export default Nav;
