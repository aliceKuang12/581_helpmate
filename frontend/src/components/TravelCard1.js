import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles';
import CreateEvent from "./CreateTravel"
import DeleteEvent from "./DeleteEventTravel"
import ViewEvent from "./ViewEvents"

import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'transparent'
}));



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
            return (
                <Stack spacing={2} sx={{ height: '100%', width: '100%', }}>
                    <Item elevation={0} sx={{ height: '90%', width: '100%', }}>
                        <Typography sx={{ fontWeight: 'bold' }}>Title: {info.title}</Typography>
                        {/* <Typography>Category: {info.category}</Typography> */}
                        <Typography>Event Time: {info.eventTime}</Typography>
                        <Typography>Location: {info.location}</Typography>
                        {info.notes ? <Typography>Notes: {info.notes} </Typography> : ""}
                        <Typography>Status: {info.completed ? "Complete" : "Incomplete"}</Typography>
                    </Item>
                    <br/>
                </Stack>
            );
        }
    )

    useEffect(() => {
        const fetchAllTravel = async () => {
            await axios.get("http://localhost:3003/travel/")
                .then(res => {
                    setData((res.data));
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
            <Paper sx={{ opacity: .9, bg: 'lightblue'}}>
                <br />
                <Typography varient='h2' component='h2' sx={{ fontWeight: 'bold' }}>
                    Today's Events:
                </Typography>
                <br/>
                {DisplayData}
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
