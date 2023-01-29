import {useEffect, useState} from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const Weather = () => {
  const [weather, setWeather] = useState([])
  const [location, setLocation] = useState([])

  const getWeather = async () => {
    await fetch("http://api.weatherapi.com/v1/current.json?key=7f716f37a5c243009af191541232501&q=Lawrence, KS&aqi=no", {
      "method": "GET",
      "headers": {}
      })
      .then((response) => {
          return response.json();
      })
      .then((data) => {
        console.log(data);
          setWeather(data.current);
          setLocation(data.location);
      })
      .catch(err => {
          console.error(err);
      });
    };

    useEffect(() => {
      getWeather()
    }, [])
  
  
      
      // Call the API
  /*fetch("http://api.weatherapi.com/v1/current.json?key=7f716f37a5c243009af191541232501&q=Lawrence, KS&aqi=no").then(function (response) {
      if (response.ok) {
          return response.json();
      } else {
          return Promise.reject(response);
      }
      }).then(function (data) {
      // Store the data to a variable
      weather_data = data;
  });*/
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

export default Weather;