/**
 * TopicCard.js
 * 
 * Pass in retreived json object from database, display the Title, time, and location 
 * from the object
 * 
 * Author: Eva Morrison, Alice Kuang
 * Since: 9/30/2022
 */

import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const TopicCard = ({ topic, dbObject }) => {

    const DisplayData = dbObject.map(
        (info) => {
            // let data = info.eventTime;
            // data = data.splice(1, 10);
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