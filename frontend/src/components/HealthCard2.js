import React from 'react'
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import BrunchDiningIcon from '@mui/icons-material/BrunchDining';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import RiceBowlIcon from '@mui/icons-material/RiceBowl';
import { Button } from "@mui/material";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'transparent',
    padding: theme.spacing(1),
  }));

const ModuleCard = (  ) => {
    function handleChange() {
        alert("API dependent, future sprint");
    }
    return (
    <Grid item xs={6} marginBottom = {5}>
        <Paper sx = {{opacity:.9}}>
            <Box 
                padding={2}
                sx={{
                    display: "flex",
                    alignItems: "left",
                    height: 500,
                    backgroundColor: 'lightgreen',
                    borderRadius: 1,
                }}
            >
            <Stack spacing={2} 
                   justifyContent="center" 
                   sx={{height: '100%', width: '100%'}}>
                <Item elevation={0} >
                    <Typography 
                        varient='h4' 
                        component='h2' 
                        sx={{fontWeight: 'bold', textAlign: 'center'}}
                    >
                    Health Statistics<br/>
                    - API integration for future sprint -
                    </Typography>
                </Item>
                <Item elevation={0}>
                <Stack  
                    sx={{height: '100%', 
                        width: '100%', 
                        textAlign: 'left',
                        padding: 3
                    }}
                    >
                    <Paper sx={{width: "75%", height: "60%", padding: 3}}>
                    <Typography sx={{fontWeight: 'bold',}}>
                        Today
                    </Typography>
                    <Typography sx={{ fontSize: 14}}>
                        <DirectionsWalkIcon sx={{fontSize: "medium"}} /> Steps: 
                    </Typography>
                    <Typography sx={{ fontSize: 14}}>
                       <MonitorHeartIcon  sx={{fontSize: "medium"}}/> Heartrate:  
                    </Typography>
                    <Typography sx={{ fontSize: 14}}>
                        <AccessTimeFilledIcon sx={{fontSize: "medium"}}/> High Intensity: 
                    </Typography>
                    <Typography sx={{ fontSize: 14}}>
                        <BrunchDiningIcon  sx={{fontSize: "medium"}}/> Calories: 
                    </Typography>
                    <Typography sx={{ fontSize: 14}}>
                       <SportsTennisIcon  sx={{fontSize: "medium"}}/> Activities: 
                    </Typography>
                    <br/>
                    <Typography sx={{fontWeight: 'bold'}}>
                        Ongoing: 
                    </Typography>
                    <Typography sx={{ fontSize: 14}}>
                        <DirectionsRunIcon  sx={{fontSize: "medium"}}/> 9000 Steps Challenge 
                    </Typography>
                    <Typography sx={{ fontSize: 14}}>
                        <RiceBowlIcon  sx={{fontSize: "medium"}}/> Keto 
                    </Typography>
                    </Paper> <br/><br/>
                <Grid container spacing={1}>    
                <Grid item xs={3}></Grid>
                <Grid item xs={1}><Button variant="contained" onClick="handleChange()" > <KeyboardArrowLeftIcon/> </Button></Grid>
                <Grid item xs={1}></Grid> &nbsp;
                <Grid item xs={1}><Button variant="contained" onClick="handleChange()" > <KeyboardArrowRightIcon/> </Button></Grid>
                </Grid>
                </Stack>
                </Item>
            </Stack>
            </Box>
        </Paper>
    </Grid>)
}

export default ModuleCard
//<Item elevation={10} sx={{width: '25%',background:'white'}}>