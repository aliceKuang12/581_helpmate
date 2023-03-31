import React, { useEffect, useState } from 'react'
import { AXIOS_HEADER } from "../../constants";
import axios from 'axios'

import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles';
import CreateEvent from "./CreateAcademic"
import DeleteEvent from "./DeleteEventAcademic"
import ViewEvent from "../ViewEvents"

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
            const time = info.eventTime;
            const exactTime = time.slice(11,16);
            const date = time.slice(5,10);
            const year = time.slice(0, 4);
            return (
                // <Item elevation={0} sx={{ height: '90%', width: '100%', }}>    {/* </Item> */}
                <div>
                    <Typography sx={{ fontWeight: 'bold' }}>Title: {info.title}</Typography>
                    <Typography>Status: {info.completed ? "Complete" : "Incomplete"}</Typography>
                    <Typography>Event Time: {date}-{year}</Typography>
                    {info.location ? <Typography>Location: {info.not}</Typography> : <br/>}
                    {info.notes ? <Typography>Notes: {info.notes} </Typography> : <br/>}
                   <br/>
                </div>
            )
        }
    )

    useEffect(() => {
        const fetchAllAssign = async () => {
            await axios({
                url: "http://localhost:3003/assignment",
                method: "GET",
                params: { user_id: localStorage.getItem("userId") },
                headers: AXIOS_HEADER
            })
                .then(res => {
                    setData((res.data.slice(0, 3)));
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err)
                })
        }
        fetchAllAssign();
    }, []);

    return (
        <Grid item xs={6} marginBottom={5}>      
            <br/>
            <Paper sx={{ opacity: .9, backgroundColor: 'coral' }}> 
                <br/>
                <Stack spacing={2} sx={{ height: '100%', width: '100%', }}> 
                
            <Typography  sx={{ fontWeight: 'bold', fontSize: 20, fontFamily: 'cursive' }}> Assignments </Typography>                
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
                <br/>
                <br/>
            </Paper>
        </Grid>)
}

export default ModuleCard