import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import AddEvent from "../components/AddEvent"
import Divider from '@material-ui/core/Divider';


const TopicCard = ({ topic  }) => {

    return (<Grid item xs={4}>
        <Paper>
            <img
                src = "https://mdbootstrap.com/img/new/slides/041.jpg"
                alt=""
                className="img">
            </img>
            <Box padding={1}>
                <Typography variant="subtitle1" component="h2" sx={{fontWeight: 'bold'}}>
                 {topic} 
                </Typography>
                <Box
                    sx={{
                        //display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Stack sx={{ padding: 1 }}>
                        None currently!
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
                    </Stack>
                </Box>
            </Box>
        </Paper>
    </Grid>
    );
};

export default TopicCard;

{/* <Typography variant = "body2" component = "li">
                       
                        {topic.event1}
                    </Typography> 
                    <Typography variant = "body2" component = "li">
                        {topic.event2}
                    </Typography>
                    <Typography variant = "body2" component = "li">
                        {topic.event3}
                    </Typography> */}