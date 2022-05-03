import {ArrowBackIosNewRounded} from '@mui/icons-material';
import {Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const BackButton = () => {
  const arrowStyle = {
    display: 'block',
    margin: '20px',
    height: '80px',
    width: '80px',
    border: '3px solid lightblue',
    borderRadius: '50%',
    backgroundColor: 'white',
  };
  const backbuttonsvg = {
    height: '60px',
    width: '60px',
  };

  const navigate = useNavigate();
  return (
    <Button
      startIcon={<ArrowBackIosNewRounded style={backbuttonsvg} />}
      style={arrowStyle}
      onClick={() => {
        navigate(-1);
      }}
    ></Button>
  );
};

export default BackButton;
