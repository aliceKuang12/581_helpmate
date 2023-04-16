/**
 * Author: Alice Kuang
 * Update Date: 3/04/23
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
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import { AXIOS_HEADER } from '../../constants'
import axios from "axios";
//import CreateEvent from "./QuickCreateHealth"

import CreateEvent from "./CreateHealth"
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'transparent',
    padding: theme.spacing(1),
}));

const ModuleCard = () => {
    const [url, setUrl] = useState([]);
    const [steps, setSteps] = useState([]);
    const [activity, setActivity] = useState([]);

    const DisplaySteps = steps.map(
        (info) => {
            let date = info.eventTime;
            date = date.slice(6, 10);
            // console.log(date);
            return (
                <div sx={{ ml: 4 }}>
                    <Typography sx={{ fontSize: 14 }}>{date}: {info.notes} steps</Typography>
                    {/* <Typography>{date} </Typography> */}
                </div>
            )
        }
    );

    const DisplayActivities = activity.map(
        (info) => {
            let date = info.eventTime;
            date = date.slice(6, 10);
            return (
                <div sx={{ ml: 4 }}>
                    <Typography sx={{ fontSize: 14 }}>{date}: {info.title} - {info.notes}</Typography>
                </div>
            )
        }
    );



    useEffect(() => {
        const fetchHealthStats = async () => {
            const promise1 = await axios({
                url: "http://localhost:3003/health/steps/",
                method: "GET",
                params: { user_id: localStorage.getItem("userId") },
                headers: AXIOS_HEADER
            })
                .then(res => {
                    setSteps((res.data));
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err)
                })
            const promise2 = await axios({
                url: "http://localhost:3003/health/activity/",
                method: "GET",
                params: { user_id: localStorage.getItem("userId") },
                headers: AXIOS_HEADER
            })
                .then(res => {
                    setActivity((res.data));
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err)
                });

            Promise.all([promise1, promise2]).then(function (values) {
                console.log(values);
            });
        }
        fetchHealthStats()
    }, []);

    return (
        <Grid item xs={6} marginBottom={3}>
            <Paper sx={{ opacity: .9 }}>
                <Box
                    padding={2}
                    sx={{
                        display: "flex",
                        alignItems: "left",
                        height: 450,
                        backgroundColor: 'forestgreen',
                        borderRadius: 1,
                    }}
                >
                    <Stack 
                    // spacing={2}
                    padding={2}
                        justifyContent="center"
                        sx={{ height: '100%', width: '100%'}}>
                        {/* <Item elevation={0}> */}
                            <Typography
                                varient='h6'
                                sx={{ fontWeight: 'bold', textAlign: 'center', fontSize: 18 }}
                            >
                                Health Statistics
                            </Typography>
                            <Stack
                                sx={{
                                    height: '100%',
                                    width: '100%',
                                    textAlign: 'left',
                                    paddingX: 4
                                }}
                                 justifyContent="center"
                            >
                                <Paper sx={{ width: "75%", height: "60%", padding: 3 }}>
                                    <Typography sx={{ fontWeight: 'bold', fontSize: 14 }}>
                                        <DirectionsWalkIcon sx={{ fontSize: "medium" }} /> Steps:
                                    </Typography>
                                    {DisplaySteps}
                                    <br />

                                    <Typography sx={{ fontWeight: 'bold', fontSize: 14 }}>
                                        <SportsTennisIcon sx={{ fontSize: "medium" }} /> Activities:
                                    </Typography>
                                    {DisplayActivities}
                                    <br />


                                </Paper> 
                                
                        </Stack>

                        <Stack>
                        <CreateEvent />
                        </Stack>                      
                                <br/>  
                                <br/>
                    </Stack>
                </Box>
            </Paper>
        </Grid>)
}

export default ModuleCard
