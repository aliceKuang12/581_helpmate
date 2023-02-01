import {useEffect, useState, useRef} from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

//https://maxrozen.com/fetching-data-react-with-useeffect
//https://bobbyhadz.com/blog/react-cant-perform-react-state-update-on-unmounted-component
//https://javascript.info/fetch
//https://www.weatherapi.com/api-explorer.aspx
//https://developer.mozilla.org/en-US/docs/Web/API/Response/json

function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  });

  return isMounted;
}

const Weather = () => {
  const [weather, setWeather] = useState(null)
  const [location, setLocation] = useState(null)
  
  const isMountedRef = useIsMounted();

    useEffect(() => {
      const getWeather = async () => {
        await fetch("http://api.weatherapi.com/v1/current.json?key=7f716f37a5c243009af191541232501&q=Lawrence, KS&aqi=no", {
          "method": "GET",
          "headers": {}
          })
          .then((response) => {
              return response.json();
          })
          .then((data) => {
            if(isMountedRef.current){
              console.log(data);
              setWeather(data.current);
              setLocation(data.location);
            }  
          })
          .catch(err => {
              console.error(err);
          });
        };
      getWeather();
    }, [isMountedRef]);

    if(weather){
      return(
        <Container sx ={{marginRight: 2, marginY: .5}}> 
          <Typography
          variant = "h6"
          component = "h6"
          position = "relative"
          align = 'right'
          color = 'white'
          >
              {location.name}, {location.region}: {weather.temp_f}{'\u00B0'}F {weather.condition.text}
          </Typography>
      </Container>
       )
    }
    else{
      return null;
    }
   
}

export default Weather;