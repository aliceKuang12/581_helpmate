import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Clock from '../components/Clock'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles';
import CreateEvent from "../components/CreateEvent"
import DeleteEvent from "../components/DeleteEvent"

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'transparent',
    padding: theme.spacing(1),
  }));

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
            <Stack spacing={2} sx={{height: '100%', width: '100%',}}>
                <Item elevation={0} sx={{height: '90%', width: '100%',}}>
                    <Typography varient='h4' component='h2'>
                        Other Event Info: 
                    </Typography>
                </Item>
                <Item elevation={0} >
                <Stack spacing={2} direction="row" sx={{height: '100%', width: '100%',}}>
                    <Item elevation={10} sx={{width: '25%',}}><CreateEvent/></Item>
                    <Item elevation={10} sx={{width: '25%',}}><DeleteEvent/></Item>
                </Stack>
                </Item>
            </Stack>
            </Box>
        </Paper>
    </Grid>
}

export default ModuleCard