import {Button, Grid, TextField, Typography} from '@mui/material';
import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import {useLogin} from '../hooks/ApiHooks';
import useForm from '../hooks/FormHooks';
import Logo from '../backgrounds/img/LogoHelpMyPet.svg';
import '../backgrounds/bg.css';
const LoginForm = () => {
  // eslint-disable-next-line no-unused-vars
  const {user, setUser} = useContext(MediaContext);
  const alkuarvot = {
    username: '',
    password: '',
  };

  const {postLogin} = useLogin();
  const navigate = useNavigate();

  const doLogin = async () => {
    console.log('doLogin');
    try {
      const userData = await postLogin(inputs);
      localStorage.setItem('token', userData.token);
      setUser(userData.user);
      navigate('/home');
    } catch (err) {
      alert(err.message);
    }
  };

  const loginformStyle = {
    display: 'block',
    borderBottom: '2px solid black',
    width: '60%',
    margin: 'auto',
    marginTop: '20px',
    backgroundColor: 'white',
  };
  const loginbuttonStyle = {
    display: 'block',
    width: '120px',
    height: '60px',
    backgroundColor: 'white',
    color: 'black',
    margin: 'auto',
    marginTop: '40px',
    borderRadius: '0',
    border: '2px var(--Blue) solid',
  };
  const loginimgStyle = {
    display: 'block',
    width: '60%',
    margin: 'auto',
    marginTop: '10vh',
    marginBottom: '5vh',
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(doLogin, alkuarvot);
  console.log(inputs);
  return (
    <div id="loginBG">
      <Grid container>
        <Grid item xs={12}>
          <Typography component="h1" variant="h2" gutterBottom></Typography>
          <img src={Logo} alt="Logo" style={loginimgStyle} />
        </Grid>

        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="username"
              name="username"
              onChange={handleInputChange}
              value={inputs.username}
              style={loginformStyle}
            />
            <TextField
              label="password"
              name="password"
              type="password"
              onChange={handleInputChange}
              value={inputs.password}
              style={loginformStyle}
            />
            <Button
              id="loginButton"
              style={loginbuttonStyle}
              type="submit"
              variant="contained"
            >
              Login
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginForm;
