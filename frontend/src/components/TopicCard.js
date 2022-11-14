import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack'
const TopicCard = ({topic}) => {
    return( <Grid item xs = {4}>
        <Paper>
            <img 
                src = {topic.img}
                alt = ""
                className = "img">
            </img>
            <Box padding = {1}>
                <Typography variant = "subtitle1" component = "h2">
                    {topic.name}
                </Typography>
                <Box 
                    sx = {{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Stack sx ={{padding: 1}}>
                    <Typography variant = "body2" component = "p">
                        * {topic.event1}
                    </Typography> 
                    <Typography variant = "body2" component = "p">
                        * {topic.event2}
                    </Typography>
                    <Typography variant = "body2" component = "p">
                        * {topic.event3}
                    </Typography>
                    </Stack>
                </Box>
            </Box>  
               
        </Paper>
    </Grid>
    ); 
};

export default TopicCard;