import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles';
import CreateEvent from "./CreateTravel"
import DeleteEvent from "./DeleteEvent-vA"
import ViewEvent from "./ViewEvents-vA"

import axios from 'axios'
import React, { useEffect, useState } from 'react'

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
            return (<div>
                <Typography>User ID: {info.userID}</Typography>
                <Typography>Title:{info.title}</Typography>
                <Typography>Category: {info.category}</Typography>
                <Typography>Event Time: {info.eventTime }</Typography>
                <Typography>Location: {info.location}</Typography>
                <Typography>Notes: {info.notes} </Typography>
                <Typography>{info.completed ? "Completed": "Incomplete"}</Typography>

            </div>
            )
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
        <Grid item xs={6} marginBottom = {5}>
            <Paper sx = {{opacity:.9}}>
                <Box 
                    padding={2}
                    sx={{
                        display: "flex",
                        alignItems: "left",
                        height: 500,
                        backgroundColor: 'lightblue',
                        borderRadius: 1,
                    }}
                >
                {DisplayData}
                </Box>
            </Paper>
        </Grid>)

    // return (
    // <Grid item xs={6} marginBottom = {5}>
    //     <Paper sx = {{opacity:.9}}>
    //         <Box 
    //             padding={2}
    //             sx={{
    //                 display: "flex",
    //                 alignItems: "left",
    //                 height: 500,
    //                 backgroundColor: 'lightblue',
    //                 borderRadius: 1,
    //             }}
    //         >
    //         <Stack spacing={2} sx={{height: '100%', width: '100%',}}>
    //             <Item elevation={0} sx={{height: '90%', width: '100%',}}>
    //                 <Typography varient='h4' component='h2' sx={{fontWeight: 'bold'}}>
    //                     Today's Events: 
    //                 </Typography>
    //                 <Typography varient='h4' component='h2' >
    //                      * Item 1
    //                 </Typography>
    //                 <Typography varient='h4' component='h2' >
    //                      * Item 2
    //                 </Typography><br/>
    //                 <Typography varient='h4' component='h2' sx={{fontWeight: 'bold'}}>
    //                     Tomorrow's Events: 
    //                 </Typography>
    //                 <Typography varient='h4' component='h2' >
    //                      * Item 1
    //                 </Typography>
    //                 <Typography varient='h4' component='h2' >
    //                      * Item 2
    //                 </Typography><br/>
    //                 <Typography varient='h4' component='h2' sx={{fontWeight: 'bold'}}>
    //                     This Week's Events: 
    //                 </Typography>
    //                 <Typography varient='h4' component='h2' >
    //                      ---
    //                 </Typography><br/>
    //             </Item>
    //             <Item elevation={0}>
    //             <Stack spacing={2} 
    //                 direction="row" 
    //                 justifyContent="center" 
    //                 sx={{height: '100%', 
    //                     width: '100%', 
    //                     textAlign: 'center',}}
    //                 >
    //                 <CreateEvent/>
    //                 <ViewEvent/>
    //                 <DeleteEvent/>
    //             </Stack>
    //             </Item>
    //         </Stack>
    //         </Box>
    //     </Paper>
    // </Grid>)
}

export default ModuleCard
//<Item elevation={10} sx={{width: '25%',background:'white'}}>