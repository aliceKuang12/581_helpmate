import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles';
import CreateEvent from "./CreateTravel"
import DeleteEvent from "./DeleteEventTravel"
import ViewEvent from "../ViewEvents"

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AXIOS_HEADER } from "../../constants"



const ModuleCard = () => {
    const [data, setData] = useState([]);

    const DisplayTitle = data.map(
        (info) => {
            return (
                <div>
                    <Typography>Title: {info.title}</Typography>
                    
                </div>
            )
        }
    )

    const DisplayData = data.map(
        (info) => {
            const time = info.eventTime;
            const exactTime = time.slice(11,16);
            const date = time.slice(5,10);
            const year = time.slice(0, 4);
            return (
                    <div >
                        <Typography sx={{ fontWeight: 'bold' }}>Title: {info.title}</Typography>
                        {/* <Typography>Category: {info.category}</Typography> */}
                        <Typography>Event Time: {exactTime}, {date}-{year}</Typography>
                        <Typography>Location: {info.location}</Typography>
                        {info.notes ? <Typography>Notes: {info.notes} </Typography> : ""}
                        <Typography>Status: {info.completed ? "Complete" : "Incomplete"}</Typography>
                        <br/>
                    </div>
                    
            );
        }
    )

    useEffect(() => {
        const fetchAllTravel = async () => {
            await axios({
                url: "http://localhost:3003/travels",
                method: "GET",
                params: {user_id: localStorage.getItem("userId")},
                headers: AXIOS_HEADER
            })
            .then(res => {
                setData((res.data.slice(0,3)));
                console.log(res.data);
            })
            .catch(err => {
                console.log(err)
            })
        }
        fetchAllTravel()
    }, []);

    return (
        <Grid item xs={6} marginBottom={5} > 
            <Paper sx={{ opacity: .9, backgroundColor: 'lightblue !important' }}>
                <br />
                <Typography varient='h2' component='h2' sx={{ fontWeight: 'bold', fontSize: 20 }}>
                    Events
                </Typography>
                <br/>
                
                <Stack spacing={2} sx={{ height: '100%', width: '100%', }}>
                {DisplayData}
                </Stack>
                <br />  <br />
                <Stack spacing={2}
                    direction="row"
                    justifyContent="center"
                    sx={{
                        height: '100%',
                        width: '100%',
                        textAlign: 'center',
                    }}
                >
                    <CreateEvent />
                    <ViewEvent color="blue" />
                    <DeleteEvent />
                </Stack>
                <br />
            </Paper>
        </Grid>)
}


export default ModuleCard
