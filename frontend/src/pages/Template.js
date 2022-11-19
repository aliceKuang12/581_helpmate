import ModuleCard from '../components/ModuleCard'
import Container from '@mui/material/Container'
import Grid from "@mui/material/Grid"
import NavBar from '../components/NavBar'
import '../App.css';
import Box from '@mui/material/Box'
import Paper from "@mui/material/Paper"
import Clock from '../components/Clock'

const Template = () => {
    return(
        <div>
            <NavBar/>
            <Clock sx = {{marginY: 5}}>
            </Clock>
            <Container > 
                <Grid container spacing={6}>
                    <ModuleCard/>
                    <ModuleCard/>
                </Grid>
            </Container>
        </div>
    );
}

export default Template;
