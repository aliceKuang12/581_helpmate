import {useState} from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

//https://www.youtube.com/watch?v=T_lFnwLiATc

const Clock = () => {
    let time = new Date().toLocaleTimeString();
    const [currentTime,setCurrentTime] = useState(time);

    const updateTime = () => {
        let time = new Date().toLocaleTimeString();
        setCurrentTime(time);
    }

    setInterval(updateTime, 1000);

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
        </Container>
    )
}

export default Clock;