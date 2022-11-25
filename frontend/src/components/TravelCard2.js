import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Clock from './Clock'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles';
import UploadButton from "./UploadImage"
import Ticket from '../images/ticket.jpg'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'transparent',
    padding: theme.spacing(1),
  }));

const ModuleCard = (  ) => {
    return (
    <Grid item xs={6} marginBottom = {5}>
        <Paper sx = {{opacity:.9}}>
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
            <Stack spacing={2} sx={{height: '100%', width: '100%',}}>
                <Item elevation={0} sx={{height: '90%', width: '100%',}}>
                    <Typography varient='h4' component='h2' sx={{fontWeight: 'bold'}}>
                        Travel Information:
                    </Typography>
             
                </Item>
                <Item elevation={0}>
                <Stack  
                    direction="row" 
                    justifyContent="center" 
                    sx={{height: '100%', 
                        width: '100%', 
                        textAlign: 'center',}}
                    >
                    <Grid container-spacing={2}  alignItems="center" justifyContent="center" >
                        <Grid item xs={10} sx={{mx: 5}}>
                            <img src={Ticket} width="300" height="350" />
                        </Grid> <br/>
                        <Grid sx={{mx: 15}}>
                        <UploadButton/>
                        </Grid>
                        <br/>
                    </Grid>
                    
                    
                </Stack>
                </Item>
            </Stack>
            </Box>
        </Paper>
    </Grid>)
}

export default ModuleCard
//<Item elevation={10} sx={{width: '25%',background:'white'}}>