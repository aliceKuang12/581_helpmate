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
        <Container sx ={{marginX: 2}}>
            <Typography
            variant = "h3"
            component = "h3"
            align = 'right'
            marginTop = {5}
            marginBottom = {3}
            >
                {currentTime}
            </Typography>
        </Container>
    )
}

export default Clock;