import {useState} from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';


//https://www.youtube.com/watch?v=T_lFnwLiATc

const Clock = () => {
    const options = { month: 'long', day: 'numeric' };

    let time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let date = new Date().toLocaleDateString('en-US', options);
    const [currentTime,setCurrentTime] = useState(time);
    const [currentDate,setCurrentDate] = useState(date);

    const updateTime = () => {
        let time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setCurrentTime(time);
    }
    const updateDate = () => {
        let date = new Date().toLocaleDateString('en-US', options);
        setCurrentDate(date);
    }

    fetch("http://api.weatherapi.com/v1/current.json?key=7f716f37a5c243009af191541232501&q=Lawrence, KS&aqi=no", {
        "method": "GET",
        "headers": {}
        })
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(err => {
            console.error(err);
        });
        
    

    setInterval(updateTime, 1000);
    setInterval(updateDate, 1000);

    return (
        //https://medium.com/12-developer-labors/css-all-the-ways-to-align-elements-left-and-right-52ecce4a4af9
        <Container sx ={{marginRight: 2, marginY: 1}}> 
            <Typography
            variant = "h4"
            component = "h4"
            position = "relative"
            //right = {15}
            //align = 'center'
            align = 'right'
            //marginTop = {5}
            //marginBottom = {3}
            color = 'white'
            >
                {currentTime}
            </Typography>
            <Typography
            variant = "h5"
            component = "h5"
            position = "relative"
            align = 'right'
            color = 'white'
            >
                {currentDate}
            </Typography>
        </Container>
    )
}

export default Clock;