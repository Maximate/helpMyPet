import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {useState} from 'react';
import {Button} from '@mui/material';
const registerToggle = {
  display: 'block',
  position: 'absolute',
  right: '40px',
  bottom: '40px',
  width: '120px',
  height: '60px',
  backgroundColor: 'white',
  color: 'black',
  float: 'right',
  marginTop: '40px',
  borderRadius: '0',
  border: '2px var(--Orange) solid',
};
const Login = () => {
  const [toggle, setToggle] = useState(true);
  return (
    <>
      {toggle ? <LoginForm /> : <RegisterForm setToggle={setToggle} />}
      <Button
        style={registerToggle}
        variant="contained"
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        {toggle ? 'Register' : 'Back'}
      </Button>
    </>
  );
};

export default Login;
