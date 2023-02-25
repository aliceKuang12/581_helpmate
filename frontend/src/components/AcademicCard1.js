import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Clock from './Clock'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles';
import CreateEvent from "./CreateAssign"
import DeleteEvent from "./DeleteAssign"
import ViewEvent from "./ViewEvents"

import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'transparent',
    padding: theme.spacing(1),
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
                <Item elevation={0} sx={{ height: '90%', width: '100%', }}>
                    <Typography sx={{ fontWeight: 'bold' }}>Title: {info.title}</Typography>
                    <Typography>Category: {info.category}</Typography>
                    <Typography>Event Time: {info.eventTime}</Typography>
                    <Typography>Location: {info.location}</Typography>
                    {info.notes ? <Typography>Notes: {info.notes} </Typography> : ""}
                    <Typography>Status: {info.completed ? "Complete" : "Incomplete"}</Typography>
                </Item>
            )
        }
    )

    useEffect(() => {
        const fetchAllAcademic = async () => {
            await axios.get("http://localhost:3003/academics/")
                .then(res => {
                    setData((res.data));
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err)
                })
        }
        fetchAllAcademic()
    }, []);

    return (
        <Grid item xs={6} marginBottom={5}>
            <Paper sx={{ opacity: .9 }}>
                <Stack spacing={2} sx={{ height: '100%', width: '100%', }}>
                    {DisplayData}
                </Stack>               
            <br/>
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
                    <ViewEvent color="red" />
                    <DeleteEvent />
                </Stack>
            </Paper>
            <br/>   
        </Grid>)
     
}

export default ModuleCard