/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import { CircularProgress, Grid } from '@mui/material';
import { useMedia } from '../hooks/ApiHooks';
// import {useWindowSize} from '../hooks/WindowHooks';
import MediaRow from './MediaRow';
import { useContext, useEffect, useState } from 'react';
import { MediaContext } from '../contexts/MediaContext';
import { safeParseJson } from '../utils/functions';
const MediaTable = ({ allFiles = true }) => {
  const { user } = useContext(MediaContext);
  const { mediaArray, loading, deleteMedia } = useMedia(allFiles, user?.user_id);
  const [coords, setCoords] = useState(null)

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  function success(pos) {
    const crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    setCoords(crd)

  }

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  useEffect(() => {
    if (navigator.geolocation) {
      console.log("starting query")
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            console.log('granted', result.state);
            navigator.geolocation.getCurrentPosition(success);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            // If denied then you have to show instructions to enable location
          }
          // result.onchange = function () {
          //   console.log(result.state);
          // };
        });
    }
  }, []);
  console.log(mediaArray);
  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid
          variant="masonry"
          // sx={{width: 500, height: 450}} cols={1} rowHeight={164}
          // cols={windowSize.width > 768 ? 3 : 1}
          // > 768 ? 3 : 2
          gap={8}
        >
          {mediaArray.map((item, index) => {
            const { location } = safeParseJson(item.description) || {
              location: item.location,
            };
            console.log(location)
            if (location && location.lat) {
              const distance = calculateDistance(coords.latitude, coords.longitude, location.lat, location.lon)
              console.log('distance to other is',distance)
              if(distance <= 50)
              return (
                <MediaRow
                  key={index}
                  file={item}
                  userId={user.user_id}
                  deleteMedia={deleteMedia}
                />
              );
            }
          })}
        </Grid>
      )}
    </>
  );
};

function calculateDistance(lattitude1, longittude1, lattitude2, longittude2) {

  const toRadian = n => (n * Math.PI) / 180

  const lat2 = lattitude2
  const lon2 = longittude2
  const lat1 = lattitude1
  const lon1 = longittude1

  console.log(lat1, lon1 + "===" + lat2, lon2)
  const R = 6371  // km
  const x1 = lat2 - lat1
  const dLat = toRadian(x1)
  const x2 = lon2 - lon1
  const dLon = toRadian(x2)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadian(lat1)) * Math.cos(toRadian(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c
  console.log("distance==?", d)
  return d
}

MediaTable.propTypes = {
  allFiles: PropTypes.bool,
};

export default MediaTable;
