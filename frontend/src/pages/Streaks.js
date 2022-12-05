import Grid from "@mui/material/Grid"
import NavBar from '../components/NavBar'
import '../App.css';
import Clock from '../components/Clock'
import Image from '../images/birdBackground2.jpg'
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Typography } from "@material-ui/core";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body1,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    width: '80%',
    height: 100,
  }));

const Streaks = () => {
    return(
        <div style={{ backgroundImage: `url(${Image})`, 
        backgroundSize: "cover",
        padding: 2 }}>
            <NavBar></NavBar>
            <Clock/>
            <Box padding = {2} marginX = {2} marginY = {2} sx={{ height: 600}}>
            <Stack spacing={2} marginX = {2}  sx = {{alignItems: 'end'}}>
                <Item sx={{backgroundColor: '#ffff66'}}>Health</Item>
                <Item sx={{backgroundColor: 'lightblue'}}>Academics</Item>
                <Item sx={{backgroundColor: 'lightgreen'}}>Social</Item>
                <Item sx={{backgroundColor: 'lightcoral'}}>Travel</Item>
            </Stack>
            </Box>
        </div>
    );
}

export default Streaks;