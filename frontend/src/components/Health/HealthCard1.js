import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Clock from '../Clock'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles';
import CreateEvent from "./CreateHealth"
import UpdateEvent from "./UpdateHealth1"
import DeleteEvent from "./DeleteEventHealth"
import ViewEvent from "../ViewEvents"

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AXIOS_HEADER } from "../../constants"

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'transparent',
    padding: theme.spacing(1),
  }));

const ModuleCard = ( ) => {
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
                <Item elevation={0} sx={{ height: '90%', width: '100%', }}>
                    <Typography sx={{ fontWeight: 'bold' }}>Title: {info.title}</Typography>
                    <Typography>Category: {info.category}</Typography>
                    <Typography>Event Time: {exactTime}, {date}-{year}</Typography>
                    <Typography>Location: {info.location}</Typography>
                    {info.notes ? <Typography>Notes: {info.notes} </Typography> : ""}
                    <Typography>Status: {info.completed ? "Complete" : "Incomplete"}</Typography>
                </Item>
            )
        }
    )

    useEffect(() => {
        const fetchAllHealth = async () => {
            await axios({
                url: "http://localhost:3003/healths",
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
        fetchAllHealth()
    }, []);
    return (
        <Grid item xs={6} marginBottom={5}>
        <Paper sx={{ opacity: .9, backgroundColor: 'forestgreen'  }}>
            <br/>
            <Stack spacing={2} sx={{ height: '100%', width: '100%'}}>
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
                <UpdateEvent />
                <DeleteEvent />
               
            </Stack> <br/>
        </Paper>
        <br/>   
    </Grid>
    )
}

export default ModuleCard
//<Item elevation={10} sx={{width: '25%',background:'white'}}>
