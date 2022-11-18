import {useState} from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

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
        <Container sx ={{marginX: 2}}> 
            <Typography
            variant = "h3"
            component = "h3"
            position = "absolute"
            right = {15}
            align = 'center'
            marginTop = {5}
            marginBottom = {3}
            >
                {currentTime}
            </Typography>
        </Container>
    )
}

export default Clock;