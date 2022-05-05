/* eslint-disable no-unreachable */
/* eslint-disable prettier/prettier */
import {
  Button,
  CircularProgress,
  Grid,
  Slider,
  Typography,
} from '@mui/material';
import {useMedia, useTag} from '../hooks/ApiHooks';
import {useNavigate} from 'react-router-dom';
import useForm from '../hooks/FormHooks';
import {useState, useEffect} from 'react';
import {appID} from '../utils/variables';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import BackButton from '../components/BackButton';
import '../backgrounds/bg.css';
import '../views/upload.css';

const Upload = () => {
  const [preview, setPreview] = useState('logo192.png');
  const alkuarvot = {
    title: '',
    description: '',
    file: null,
  };

  const filterarvot = {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    sepia: 0,
  };

  const validators = {
    title: ['required', 'minStringLength: 3'],
    description: ['minStringLength: 5'],
  };

  const errorMessages = {
    username: ['required field', 'minimum 3 characters'],
    description: ['minimum 5 characters'],
  };

  const {postMedia, loading} = useMedia();
  const [coords, setCoords] = useState(null);
  const {postTag} = useTag();
  const navigate = useNavigate();

  const doUpload = async () => {
    try {
      console.log('doUpload');
      // lisätään filtterit descriptioniin

      const desc = {
        description: inputs.description,
        filters: filterInputs,
        location: {lat: coords.latitude,lon: coords.longitude}
      };
      const token = localStorage.getItem('token');
      const formdata = new FormData();
      formdata.append('title', inputs.title);
      formdata.append('description', JSON.stringify(desc));
      formdata.append('file', inputs.file);
      const mediaData = await postMedia(formdata, token);
      const tagData = await postTag(
        {
          file_id: mediaData.file_id,
          tag: appID,
        },
        token
      );
      confirm(tagData.message) && navigate('/home');
    } catch (err) {
      alert(err.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doUpload,
    alkuarvot
  );

  const {inputs: filterInputs, handleInputChange: handleSliderChange} = useForm(
    null,
    filterarvot
  );

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  function success(pos) {
    const crd = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    setCoords(crd);
  }

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    if (inputs.file) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setPreview(reader.result);
      });
      reader.readAsDataURL(inputs.file);
    }

    if (navigator.geolocation && coords == null) {
      console.log('starting query');
      navigator.permissions
        .query({name: 'geolocation'})
        .then(function (result) {
          if (result.state === 'granted') {
            console.log('granted', result.state);
            navigator.geolocation.getCurrentPosition(success);
          } else if (result.state === 'prompt') {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === 'denied') {
            // If denied then you have to show instructions to enable location
          }
          // result.onchange = function () {
          //   console.log(result.state);
          // };
        });
    }
  }, [inputs.file]);

  console.log(inputs, filterInputs);

  const imgStyle = {
    display: 'block',
    height: '200px',
    width: '200px',
    border: 'var(--Orange) 2px solid',
    borderRadius: '50%',
    margin: 'auto',
    marginTop: '40px',
    marginBottom: '40px',
  };
  const addpetnameStyle = {
    display: 'block',
    margin: 'auto',
    marginBottom: '20px',
    borderBottom: 'solid 2px black',
    height: '50%',
    width: '70vw',
    textAlign: 'center',
    backgroundColor: 'white',
    boxShadow: '5px 5px 20px -8px',
    opacity: '0.8',
    borderRadius: '2px',
  };
  const addpetdescStyle = {
    display: 'block',
    margin: 'auto',
    width: '85vw',
    marginBottom: '20px',
    height: '200px',
    backgroundColor: 'white',
    boxShadow: '5px 5px 20px -8px',
    borderRadius: '2px',
  };
  const addpetimgStyle = {
    display: 'block',
    margin: 'auto',
    width: '85vw',
    marginBottom: '20px',
    height: '50px',
    backgroundColor: 'white',
    boxShadow: '5px 5px 20px -8px',
    borderRadius: '2px',
  };
  const addButton = {
    color: 'black',
    backgroundColor: 'white',
    border: 'var(--Blue) 2px solid',
    float: 'right',
    width: '100px',
    height: '50px',
    borderRadius: '0px',
    marginRight: '45px',
  };

  return (
    <div id="addpetBG">
      <>
        <Grid container>
          <Grid item xs={12}>
            <BackButton />
            <Typography component="h1" variant="h2" gutterBottom></Typography>
          </Grid>

          <Grid item xs={12}>
            <ValidatorForm onSubmit={handleSubmit}>
              <img
                src={'https://placekitten.com/320'}
                alt="Add pet image"
                style={imgStyle}
              />
              <TextValidator
                placeholder="Pet name"
                name="title"
                id="addpetName"
                onChange={handleInputChange}
                value={inputs.title}
                validators={validators.title}
                errorMessages={errorMessages.title}
                style={addpetnameStyle}
              />
              <TextValidator
                fullWidth
                placeholder="Information"
                name="description"
                id="addpetDesc"
                onChange={handleInputChange}
                value={inputs.description}
                validators={validators.description}
                errorMessages={errorMessages.description}
                style={addpetdescStyle}
              />
              <TextValidator
                style={addpetimgStyle}
                type="file"
                name="file"
                accept="image/*, video/*, audio/*"
                onChange={handleInputChange}
              />
              {loading ? (
                <CircularProgress />
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!inputs.file}
                  style={addButton}
                >
                  Add
                </Button>
              )}
            </ValidatorForm>
          </Grid>
        </Grid>
        {inputs.file && (
          <Grid container>
            <Grid item xs={12}>
              <img
                style={{
                  width: '100%',
                  filter: `
                brightness(${filterInputs.brightness}%)
                contrast(${filterInputs.contrast}%)
                saturate(${filterInputs.saturation}%)
                sepia(${filterInputs.sepia}%)
                `,
                }}
                src={preview}
                alt="preview"
              />
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Typography>Brightness</Typography>
                <Slider
                  name="brightness"
                  min={0}
                  max={200}
                  step={1}
                  valueLabelDisplay="on"
                  onChange={handleSliderChange}
                  value={filterInputs.brightness}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>Contrast</Typography>
                <Slider
                  name="contrast"
                  min={0}
                  max={200}
                  step={1}
                  valueLabelDisplay="on"
                  onChange={handleSliderChange}
                  value={filterInputs.contrast}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>Saturation</Typography>
                <Slider
                  name="saturation"
                  min={0}
                  max={200}
                  step={1}
                  valueLabelDisplay="on"
                  onChange={handleSliderChange}
                  value={filterInputs.saturation}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>Sepia</Typography>
                <Slider
                  name="sepia"
                  min={0}
                  max={100}
                  step={1}
                  valueLabelDisplay="on"
                  onChange={handleSliderChange}
                  value={filterInputs.sepia}
                />
              </Grid>
            </Grid>
          </Grid>
        )}
      </>
    </div>
  );
};

export default Upload;
