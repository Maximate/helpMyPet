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
import Snake from '../assets/snake.svg'
import logo from '../assets/logo-drawer.svg'
import MenuIcon from '@mui/icons-material/Menu';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MediaContext } from '../contexts/MediaContext';
import { useUser } from '../hooks/ApiHooks';
import { Home, AccountCircle, CloudUpload, Folder, } from '@mui/icons-material';
import UserIcon from '../assets/userIcon.png';
import MailIcon from '../assets/mail.png';
import PawIcon from '../assets/pawIcon.png';
import Menu from '../assets/menu.svg';


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

  const iconStyle = { fontSize: "7vw", height: '7vw'};
  const iconCircule = {
    display: "inline-block", borderRadius: "60px",
    boxShadow: "7px 7px 15px #888", padding: "0.5em 0.6em", marginRight: "5vw", marginLeft: "10vw"
  };
  const newPet = {
    width: "50px", height: "50px"
  };
  const font = {familyFont: 'var(--HeadFont) !important'};

  return (
    <Box >
      <Fab
        style={{position: "relative", left: "9%", marginTop: "5%", width: '80px', height: '80px', border: '2px solid var(--Blue)', backgroundColor: 'white'}}
        onClick={() => {
          setOpen(!open);
        }}>
        <img src={Menu} alt="Menu" style={{display: 'block', position: 'relative', top: '50%', transform: 'translateY(-32%)', fontSize: '2em'}} />
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
              <img src={UserIcon} alt="UserIcon" style={iconStyle} />
              </div>
            </ListItemIcon>
            <ListItemText style={{fontFamily: 'var(--HeadFont)'}} primary="Me" />
          </ListItemButton>

          <ListItemButton component={Link} to="/Offers">
            <ListItemIcon>
              <div style={iconCircule}>
              <img src={MailIcon} alt="mailIcon" style={iconStyle} />
              </div>
            </ListItemIcon>
            <ListItemText primary="Offers" />
          </ListItemButton>

          <ListItemButton component={Link} to={'/MyFiles'}>
            <ListItemIcon>
              <div style={iconCircule}>
              <img src={PawIcon} alt="PawIcon" style={iconStyle} />
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
