/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import {useUser} from '../hooks/ApiHooks';
import useForm from '../hooks/FormHooks';
import {Grid} from '@mui/material';
import {Typography} from '@mui/material';
import {Button} from '@mui/material';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {useEffect} from 'react';
import '../backgrounds/bg.css';

const RegisterForm = ({setToggle}) => {
  const alkuarvot = {
    username: '',
    password: '',
    confirm: '',
    email: '',
    full_name: 'You can tell about yourself in this text field!',
  };

  const validators = {
    username: ['required', 'minStringLength: 3', 'isAvailable'],
    password: ['required', 'minStringLength: 5'],
    confirm: ['required', 'isPasswordMatch'],
    email: ['required', 'isEmail'],
    full_name: ['minStringLength: 30'],
  };

  const errorMessages = {
    username: [
      'required field',
      'minimum 3 characters',
      'usename not available',
    ],
    password: ['required field', 'minimum 5 characters'],
    confirm: ['required field', 'passwords do not match'],
    email: ['required field', 'not email address'],
    full_name: ['minimum 30 characters'],
  };

  const {postUser, getUsername} = useUser();

  const doRegister = async () => {
    console.log('doRegister');
    try {
      delete inputs.confirm;
      const userData = await postUser(inputs);
      userData && setToggle(true);
    } catch (err) {
      alert(err.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doRegister,
    alkuarvot
  );

  const registerformStyle = {
    display: 'block',
    borderBottom: '2px solid black',
    width: '60%',
    margin: 'auto',
    marginTop: '20px',
  };
  const registerbuttonStyle = {
    display: 'block',
    width: '120px',
    height: '60px',
    backgroundColor: 'white',
    color: 'black',
    margin: 'auto',
    marginTop: '40px',
    borderRadius: '0',
    border: '2px orange solid',
  };

  useEffect(() => {
    ValidatorForm.addValidationRule('isAvailable', async (value) => {
      try {
        return await getUsername(value);
      } catch (err) {
        return true;
      }
    });

    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      /*
      if (value !== inputs.password) {
        return false;
      }
      return true;
      */
      console.log('validator', value, inputs.password);
      return value === inputs.password ? true : false;
    });

    return () => {
      ValidatorForm.removeValidationRule('isAvailable');
    };
  }, [inputs]);

  return (
    <div id="registerBG">
      <Grid container>
        <Grid item xs={12}>
          <Typography component="h1" variant="h2" gutterBottom>
            Register
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <ValidatorForm onSubmit={handleSubmit}>
            <TextValidator
              label="username"
              name="username"
              onChange={handleInputChange}
              value={inputs.username}
              validators={validators.username}
              errorMessages={errorMessages.username}
              style={registerformStyle}
            />
            <TextValidator
              label="password"
              name="password"
              type="password"
              onChange={handleInputChange}
              value={inputs.password}
              validators={validators.password}
              errorMessages={errorMessages.password}
              style={registerformStyle}
            />
            <TextValidator
              label="re-type password"
              name="confirm"
              type="password"
              onChange={handleInputChange}
              value={inputs.confirm}
              validators={validators.confirm}
              errorMessages={errorMessages.confirm}
              style={registerformStyle}
            />
            <TextValidator
              label="email"
              name="email"
              type="email"
              onChange={handleInputChange}
              value={inputs.email}
              validators={validators.email}
              errorMessages={errorMessages.email}
              style={registerformStyle}
            />
            <TextValidator
              label="description"
              name="full_name"
              onChange={handleInputChange}
              value={inputs.full_name}
              validators={validators.full_name}
              errorMessages={errorMessages.full_name}
              style={registerformStyle}
            />
            <Button
              style={registerbuttonStyle}
              type="submit"
              variant="contained"
            >
              Register
            </Button>
          </ValidatorForm>
        </Grid>
      </Grid>
    </div>
  );
};

RegisterForm.propTypes = {
  setToggle: PropTypes.func,
};

export default RegisterForm;
