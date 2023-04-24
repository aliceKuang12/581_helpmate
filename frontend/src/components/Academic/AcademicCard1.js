import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles';
import CreateEvent from "./CreateAcad1"
import UpdateEvent from "./UpdateAcad1"
import DeleteEvent from "./DeleteAssign"
import ViewEvent from "../ViewEvents"
import Box from "@mui/material/Box";
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AXIOS_HEADER } from "../../constants";
import moment from "moment-timezone";


const ModuleCard = () => {
    const [data, setData] = useState([]);


    const DisplayData = data.map(
        (info) => {
            const time = info.eventTime;
            const cst_time = moment.tz(time, "America/Chicago").format();
            const exactTime = time.slice(11,16);
            const date = time.slice(5,10);
            const year = time.slice(0, 4);
            return (
                <div>
                    <Typography sx={{ fontWeight: 'bold' }}>Title: {info.title}</Typography>
                    <Typography>Category: {info.category}</Typography>
                    <Typography>Event Time: {exactTime}, {date}-{year}  </Typography>
                    <Typography>Location: {info.location}</Typography>
                    {info.notes ? <Typography>Notes: {info.notes} </Typography> : ""}
                    {/* <Typography>Status: {info.completed ? "Complete" : "Incomplete"}</Typography> */}
                    <br/>
                </div>
            )
        }
    )

    useEffect(() => {
        const fetchAllAcademic = async () => {
            await axios({
                url: "http://localhost:3003/academics",
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
        fetchAllAcademic();
    }, []);

    return (
        <Grid item xs={6} marginBottom={5}>
              <br/>
            <Paper sx={{ opacity: .9, backgroundColor: 'coral' }}>
                   <br/>
                    <Stack spacing={2} sx={{ height: '100%', width: '100%', }}>
                    <Typography  sx={{ fontWeight: 'bold', fontSize: 20, fontFamily: 'cursive' }}> Events </Typography>                  
                        {DisplayData}
                    </Stack>
                    <br />
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
                        {/* <ViewEvent color="red" /> */}
                        <DeleteEvent />
                        <br />
                    </Stack>
                    <br />
            </Paper>
            <br />
        </Grid>)

}

export default ModuleCard