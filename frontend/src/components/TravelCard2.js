import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Clock from './Clock'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles';
import UploadImage from "./UploadImageTravel"

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'transparent',
    // padding: theme.spacing(1),
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
            <Stack spacing={2} 
                   justifyContent="center" 
                   sx={{height: '100%', width: '100%'}}>
                {/* <Item elevation={0} > */}
                    <Typography 
                        varient='h4' 
                        component='h2' 
                        sx={{fontWeight: 'bold', textAlign: 'center'}}
                    >
                    Travel Information
                    </Typography>
                {/* </Item> */}
                <Item elevation={0}>
                {/* <Stack  
                    direction="row" 
                    justifyContent="center" 
                    sx={{height: '100%', 
                        width: '100%', 
                        textAlign: 'center',}}
                    >
                    <br/>
                </Stack> */}
                
                <UploadImage/>
                </Item>
                
            </Stack>
            </Box>
        </Paper>
    </Grid>)
}

export default ModuleCard
//<Item elevation={10} sx={{width: '25%',background:'white'}}>