import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import Clock from '../components/Clock'


const ModuleCard = () => {
    return <Grid item xs={6}>
        <Paper>
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
            <Typography varient='h4' component='h2'>
                Today's Events: 
            </Typography>
            <Clock/>
            </Box>
        </Paper>
    </Grid>
}

export default ModuleCard