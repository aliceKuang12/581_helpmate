/**
 * Author: Alice Kuang
 * Update Date: 2/25/23
 * Creation Date: 11/20/22
 * Description: This card pulls from user's health data through the mysql
 *      api. It is also able to get the stetps of the users googleFIt account
 *      through user authentication.
 * */
import { React, useRef, useEffect, useState } from 'react'
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import BrunchDiningIcon from '@mui/icons-material/BrunchDining';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import { Button } from "@mui/material";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'transparent',
    padding: theme.spacing(1),
}));

const ModuleCard = () => {
    // function handleChange() {
    //     alert("API dependent, future sprint");
    // }
    const [url, setUrl] = useState([]);
    const [steps, setSteps] = useState([]);
    const [activity, setActivity] = useState([]);

    const DisplaySteps = steps.map(
        (info) => {
            let date = info.eventTime; 
            date = date.slice(6,10);
            // console.log(date);
            return (
                <div sx={{ml: 4}}>
                    <Typography sx={{fontSize: 12}}>{date}: {info.notes} steps</Typography> 
                    {/* <Typography>{date} </Typography> */}
                </div>
            )
        }
    );

    const DisplayActivities = activity.map(
        (info) => {
            let date = info.eventTime; 
            date = date.slice(6,10);
            // console.log(date);
            return (
                <div sx={{ml: 4}}>
                    <Typography sx={{fontSize: 12}}>{date}: {info.title} - {info.notes}</Typography> 
                </div>
            )
        }
    );

    useEffect(() => {
        const fetchHealthStats = async () => {
            const promise1 = await axios.get("http://localhost:3003/health/steps/" + localStorage.getItem("email"))
                .then(res => {
                    setSteps((res.data));
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err)
                })
                const promise2 = await axios.get("http://localhost:3003/health/activity/" + localStorage.getItem("email")).then(res => {
                    setActivity((res.data));
                    console.log(res.data);
                })
                    .catch(err => {
                        console.log(err)
                    });
    
                const promise3= await axios.get("http://localhost:5000/getUrl")
                .then(res => {
                    // res.data alerts as [object Object] 
                    // retreive contents: https://stackoverflow.com/questions/1625208/print-content-of-javascript-object
                    var out = '';
                    for (var p in res.data) {
                        out += p + ': ' + res.data[p] + '\n';
                    }
                    const removeFirst5 = out.slice(4); // javascript string slice, remove 'url: '
                    setUrl(removeFirst5);
                })
                .catch(err => {
                    console.log(err)
                })

                Promise.all([promise1, promise2, promise3]).then(function (values) {
                    console.log(values);
                });
        }
        fetchHealthStats()
    }, []);


    /*
    useEffect(() => {
        const getFitAuth = async () => {
            
        }
        getFitAuth()
    }, []);
 */

    return (
        <Grid item xs={6} marginBottom={5}>
            <Paper sx={{ opacity: .9 }}>
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
                        sx={{ height: '100%', width: '100%' }}>
                        <Item elevation={0} >
                            <Typography
                                varient='h1'
                                sx={{ fontWeight: 'bold', textAlign: 'center', fontSize: 18 }}
                            >
                                Health Statistics<br />                    
                            </Typography>
                        </Item>
                        <Item elevation={0}>
                            <Stack
                                sx={{
                                    height: '100%',
                                    width: '100%',
                                    textAlign: 'left',
                                    padding: 2
                                }}
                                justifyContent="center"
                            >
                                <Paper sx={{ width: "75%", height: "60%", padding: 3 }}>
                
                                    {/* <Typography sx={{ fontWeight: 'bold', }}>
                                        Today
                                    </Typography><br /> */}
                                    <Typography sx={{ fontWeight: 'bold', fontSize: 14 }}>
                                        <DirectionsWalkIcon sx={{ fontSize: "medium" }} /> Steps:
                                    </Typography>
                                    {DisplaySteps}

                                    <br/>
                                    <Typography sx={{ fontWeight: 'bold', fontSize: 14 }}>
                                        <SportsTennisIcon sx={{ fontSize: "medium" }} /> Activities:
                                    </Typography>
                                    {DisplayActivities}
                                    <br />


                                </Paper> <br />
                            </Stack>
                        </Item>
                        <div alignItems="center" >
                            <Typography
                                sx={{
                                    textAlign: 'center',
                                    padding: 0
                                }}>
                                <a href={url} target="_blank">Google Fit Steps Log</a>
                            </Typography>
                            <br />
                            <Button size="small" variant='contained'
                                sx={{
                                    width: "50%",
                                }}
                            >
                                Add today's data
                            </Button>
                        </div>
                    </Stack>
                </Box>
            </Paper>
        </Grid>)
}

export default ModuleCard
/*
                                     <Typography sx={{ fontSize: 14 }}>
                                        <MonitorHeartIcon sx={{ fontSize: "medium" }} /> Heartrate:
                                    </Typography>

                                    <Typography sx={{ fontSize: 14 }}>
                                        <BrunchDiningIcon sx={{ fontSize: "medium" }} /> Calories:
                                    </Typography> 
                                    <Typography sx={{ fontSize: 14 }}>
                                        <AccessTimeFilledIcon sx={{ fontSize: "medium" }} /> Sleep:
                                    </Typography> 
<Grid container spacing={1}>    
<Grid item xs={3}></Grid>
<Grid item xs={1}><Button variant="contained" onClick="handleChange()" > <KeyboardArrowLeftIcon/> </Button></Grid>
<Grid item xs={1}></Grid> &nbsp;
<Grid item xs={1}><Button variant="contained" onClick="handleChange()" > <KeyboardArrowRightIcon/> </Button></Grid>
</Grid>
*/