import {Button, CircularProgress, Grid, Typography} from '@mui/material';
import {useMedia} from '../hooks/ApiHooks';
import {useNavigate, useLocation} from 'react-router-dom';
import useForm from '../hooks/FormHooks';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {safeParseJson} from '../utils/functions';
import {mediaUrl} from '../utils/variables';
import BackButton from '../components/BackButton';
import '../backgrounds/bg.css';

const Modify = () => {
  const location = useLocation();
  const file = location.state.file;
  const {description, filters} = safeParseJson(file.description) || {
    description: file.description,
    filters: {
      brightness: 100,
      contrast: 100,
      saturation: 100,
      sepia: 0,
    },
  };

  console.log(file);

  const alkuarvot = {
    title: file.title,
    description: description,
  };

  const validators = {
    title: ['required', 'minStringLength: 3'],
    description: ['minStringLength: 5'],
  };

  const errorMessages = {
    username: ['required field', 'minimum 3 characters'],
    description: ['minimum 5 characters'],
  };

  const {putMedia, loading} = useMedia();
  const navigate = useNavigate();

  const doModify = async () => {
    try {
      console.log('doModify');
      // lisätään filtterit descriptioniin
      const desc = {
        description: inputs.description,
        filters: filterInputs,
      };
      // tee sopiva objekti lähetettäväksi
      const data = {
        title: inputs.title,
        description: JSON.stringify(desc),
      };

      const token = localStorage.getItem('token');
      const mediaData = await putMedia(file.file_id, data, token);
      confirm(mediaData.message) && navigate(-1);
    } catch (err) {
      alert(err.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doModify,
    alkuarvot
  );

  const {inputs: filterInputs} = useForm(null, filters);

  console.log(inputs, filterInputs);

  const editpetnameStyle = {
    display: 'block',
    margin: 'auto',
    marginBottom: '20px',
    borderBottom: 'solid 2px black',
    height: '50%',
    width: '70vw',
    textAlign: 'center',
    backgroundColor: 'white',
    boxShadow: '7px 7px 15px #888',
    opacity: '0.8',
    borderRadius: '2px',
  };

  const editpetdescStyle = {
    display: 'block',
    margin: 'auto',
    width: '85vw',
    marginBottom: '20px',
    height: '200px',
    backgroundColor: 'white',
    boxShadow: '7px 7px 15px #888',
    borderRadius: '2px',
  };

  return (
    <div id="modifyBG">
      <>
        <Grid container>
          <Grid item xs={12}>
            <BackButton />
            <Typography component="h1" variant="h2" gutterBottom></Typography>
          </Grid>

          <img
            style={{
              borderRadius: '50%',
              width: '240px',
              height: '240px',
              border: '2px var(--Orange) solid',
              display: 'block',
              margin: 'auto',
              marginBottom: '40px',
              boxShadow: '7px 7px 15px #888',

              filter: `
                brightness(${filterInputs.brightness}%)
                contrast(${filterInputs.contrast}%)
                saturate(${filterInputs.saturation}%)
                sepia(${filterInputs.sepia}%)
                `,
            }}
            src={mediaUrl + file.filename}
            alt="preview"
          />
          <Grid item xs={12}>
            <ValidatorForm onSubmit={handleSubmit}>
              <TextValidator
                id="addpetName"
                placeholder="title"
                name="title"
                onChange={handleInputChange}
                value={inputs.title}
                validators={validators.title}
                errorMessages={errorMessages.title}
                style={editpetnameStyle}
              />
              <TextValidator
                id="addpetDesc"
                placeholder="description"
                name="description"
                onChange={handleInputChange}
                value={inputs.description}
                validators={validators.description}
                errorMessages={errorMessages.description}
                style={editpetdescStyle}
              />

              {loading ? (
                <CircularProgress />
              ) : (
                <Button
                  color="primary"
                  type="submit"
                  variant="contained"
                  style={{
                    margin: '40px 0',
                    color: 'black',
                    backgroundColor: 'white',
                    border: 'var(--Blue) 2px solid',
                    float: 'right',
                    width: '100px',
                    height: '50px',
                    borderRadius: '0px',
                    marginRight: '45px',
                    fontFamily: 'var(--RegularFont)',
                  }}
                >
                  Save
                </Button>
              )}
            </ValidatorForm>
          </Grid>
        </Grid>
      </>
    </div>
  );
};

export default Modify;
