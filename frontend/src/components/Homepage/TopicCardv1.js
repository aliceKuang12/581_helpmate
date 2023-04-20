/**
 * TopicCardv1.js
 * 
 * Display google user profile info, retreiving name, email and profile picture from google login
 * and other attributes from database associated with user's email. 
 * 
 * Author: Alice Kuang
 * Since: 3/15/23
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