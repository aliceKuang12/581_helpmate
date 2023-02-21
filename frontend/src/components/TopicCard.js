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
            return (<div sx={{ textAlign: 'left' }}>
                <Typography sx={{ fontWeight: 'bold' }}>Title: {info.title}</Typography>
                <Typography> Time:{info.eventTime}</Typography>
                <Typography>Location: {info.location}</Typography>
                <br />
            </div>
            )
        }
    )

    return (<Grid item xs={4}>
        <Paper>
            <img
                src="https://mdbootstrap.com/img/new/slides/041.jpg"
                alt=""
                className="img">
            </img>
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