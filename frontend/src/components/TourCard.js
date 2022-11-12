import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const TourCard = ({tour}) => {
    return( <Grid item xs = {4}>
        <Paper>
            <img 
                src = {tour.img}
                alt = ""
                className = "img">
            </img>
            <Box padding = {1}>
                <Typography variant = "subtitle1" component = "h2">
                    {tour.name}
                </Typography>
                <Box 
                    sx = {{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Typography variant = "body2" component = "p">
                        Random text
                    </Typography>
                </Box>
            </Box>  
               
        </Paper>
    </Grid>
    ); 
};

export default TourCard;