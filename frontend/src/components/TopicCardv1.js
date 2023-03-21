import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import AddEvent from "../components/AddEvent"
import Divider from '@material-ui/core/Divider';

const TopicCard = ({ topic, dbObject }) => {

    const DisplayData = dbObject.map(
        (info) => {
            // let data = info.eventTime;
            // data = data.splice(1, 10);
            return (<div sx={{ textAlign: 'left' }}>
                <img src={localStorage.getItem("profilePic")}></img> 
                <Typography sx={{ fontWeight: 'bold' }}>@ {info.username}</Typography>
                <Typography >Name: {localStorage.getItem("name")}</Typography>
                <Typography >Email: {info.email}</Typography>
                <Typography> Birthday: {info.birthday}</Typography>
                <Typography>Cell: {info.cell}</Typography>
                <Typography>Address: {info.address ? info.address: "N/A"}</Typography>
                <br />
            </div>
            )
        }
    )

    return (<Grid item xs={4}>
        <Paper>

            <Box padding={1}>
                <Typography variant="subtitle1" component="h2" sx={{ fontWeight: 'bold' }}>
                    {topic}
                </Typography>
                <Box
                    sx={{
                        //display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Stack sx={{ padding: 1 }}>
                        {DisplayData}
                    </Stack>
                </Box>
            </Box>
        </Paper>
    </Grid>
    );
};

export default TopicCard;

{/*
                        <Divider style={{ height: 1, backgroundColor: 'black', marginTop: 10, marginBottom: 10 }} />
                        <Grid container spacing={2} sx={{ mx: 2 }}>

                            <Grid item xs={2} sx={{ mt: 5 }}>
                                <AddIcon />
                            </Grid> 
                            <Grid item xs={8} sx={{}}>
                                <AddEvent />
                            </Grid>

                        </Grid>*/}