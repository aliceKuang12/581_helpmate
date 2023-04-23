/**
 * TopicCardv2.js
 * 
 * Display a module card with the given topic. This card is corresponds to the top alerts
 * card and the add notes card on the homepage, both of which are not yet implemented
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
                    {/* display the topic as the title of the card */}
                 {topic} 
                </Typography>
                <Box
                    sx={{
                        //display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Stack sx={{ padding: 1 }}>
                        {/* location of where data will be displayed */}
                        
                        None currently!

                    </Stack>
                </Box>
            </Box>
        </Paper>
    </Grid>
    );
};

export default TopicCard;
