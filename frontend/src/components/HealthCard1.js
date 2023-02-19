import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Clock from './Clock'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles';
import CreateEvent from "./CreateHealth"
import DeleteEvent from "./DeleteEvent-vA"
import ViewEvent from "./ViewEvents"

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'transparent',
    padding: theme.spacing(1),
  }));

const ModuleCard = ( ) => {
    return (
    <Grid item xs={6} marginBottom = {5}>
        <Paper sx = {{opacity:.9}}>
            <Box 
                padding={2}
                sx={{
                    display: "flex",
                    alignItems: "left",
                    height: 500,
                    backgroundColor: 'lightgreen',
                    borderRadius: 1,
                }}
            >
            <Stack spacing={2} sx={{height: '100%', width: '100%',}}>
                <Item elevation={0} sx={{height: '90%', width: '100%',}}>
                    <Typography varient='h4' component='h2' sx={{fontWeight: 'bold'}}>
                        Today's Events: 
                    </Typography>
                    <Typography varient='h4' component='h2' >
                         * Item 1
                    </Typography>
                    <Typography varient='h4' component='h2' >
                         * Item 2
                    </Typography><br/>
                    <Typography varient='h4' component='h2' sx={{fontWeight: 'bold'}}>
                        Tomorrow's Events: 
                    </Typography>
                    <Typography varient='h4' component='h2' >
                         * Item 1
                    </Typography>
                    <Typography varient='h4' component='h2' >
                         * Item 2
                    </Typography><br/>
                    <Typography varient='h4' component='h2' sx={{fontWeight: 'bold'}}>
                        This Week's Events: 
                    </Typography>
                    <Typography varient='h4' component='h2' >
                         ---
                    </Typography><br/>
                </Item>
                <Item elevation={0}>
                <Stack spacing={2} 
                    direction="row" 
                    justifyContent="center" 
                    sx={{height: '100%', 
                        width: '100%', 
                        textAlign: 'center',}}
                    >
                    <CreateEvent/>
                    <ViewEvent color = "blue"/>
                    <DeleteEvent/>
                </Stack>
                </Item>
            </Stack>
            </Box>
        </Paper>
    </Grid>)
}

export default ModuleCard
//<Item elevation={10} sx={{width: '25%',background:'white'}}>