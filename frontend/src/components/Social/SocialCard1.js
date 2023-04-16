import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles';
import CreateEvent from "./CreateSocial"
import UpdateEvent from "./UpdateSocial1"
import DeleteEvent from "./DeleteEventSocial"
import ViewEvent from "../ViewEvents"

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AXIOS_HEADER } from "../../constants";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'transparent',
    padding: theme.spacing(1),
}));

const ModuleCard = ( ) => {
    const [data, setData] = useState([]);

    const DisplayData = data.map(
        (info) => {
            const time = info.eventTime;
            const exactTime = time.slice(11,16);
            const date = time.slice(5,10);
            const year = time.slice(0, 4);
            return (
                <div>
                    <Typography sx={{ fontWeight: 'bold' }}>Title: {info.title}</Typography>
                    <Typography>Category: {info.category}</Typography>
                    <Typography>Event Time: {exactTime}, {date}-{year}</Typography>
                    {info.location ? <Typography>Location: {info.location}</Typography>: ""}
                    {info.notes ? <Typography>Notes: {info.notes} </Typography> : ""}
                    <Typography>Status: {info.completed ? "Complete" : "Incomplete"}</Typography>
                </div>
            )
        }
    )

    useEffect(() => {
        const fetchAllSocial = async () => {
            await axios({
                url: "http://localhost:3003/social",
                method: "GET",
                params: {user_id: localStorage.getItem("userId")},
                headers: AXIOS_HEADER
            })
            .then(res => {
                setData((res.data.slice(0,3)));
            })
            .catch(err => {
                console.log(err)
            })
        }
        fetchAllSocial()
    }, []);

    return (
        <Grid item xs={6} marginBottom={5}>
            <Paper sx={{ opacity: .9, backgroundColor: 'orange !important' }}>
                <Stack spacing={2} sx={{ height: '100%', width: '100%', }}>
                <br/>
                <Typography  sx={{ fontWeight: 'bold', fontSize: 20, fontFamily: 'cursive' }}> Events </Typography>
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
                </Stack>
                <br/>
            </Paper>
            <br/>   
        </Grid>
    )
}

export default ModuleCard
