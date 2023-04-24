/**
 * Author: Eva Morrison
 * Created: 11/17/22
 * Update Date: 1/29/23
 * Description: Clock component. Gets the current time and date to display in the upper right hand corner
 * automatically and continously refreshes
 * 
 * Resources used: 
 *  https://www.youtube.com/watch?v=T_lFnwLiATc
 *  https://medium.com/12-developer-labors/css-all-the-ways-to-align-elements-left-and-right-52ecce4a4af9
 */


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
    

    //update time and date every second (1000ms)
    setInterval(updateTime, 1000);
    setInterval(updateDate, 1000);



    return (
        //https://medium.com/12-developer-labors/css-all-the-ways-to-align-elements-left-and-right-52ecce4a4af9
        <Container sx ={{marginRight: 2, marginY: 1}}> 
            {/* //Display current time */}
            <Typography
            variant = "h4"
            component = "h4"
            position = "relative"
            align = 'right'
            color = 'white'
            >
                {currentTime}
            </Typography>
            {/* Display current date */}
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