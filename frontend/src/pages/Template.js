import ModuleCard from '../components/ModuleCard'
import ModuleCard2 from '../components/ModuleCard2'
import Container from '@mui/material/Container'
import Grid from "@mui/material/Grid"
import NavBar from '../components/NavBar'
import '../App.css';
import Box from '@mui/material/Box'
import Paper from "@mui/material/Paper"
import Clock from '../components/Clock'
//import Image from '../images/BirdBackground.jpg'
import Image from '../images/birdBackground2.jpg'

const Template = () => {
    return(
        <div>
            <Container maxWidth="100vh" 
                maxHeight="100vh" 
                style={{ backgroundImage: `url(${Image})`, 
                backgroundSize: "cover" }}
            > 
            <NavBar></NavBar>
            <Clock/>
                <Grid container spacing={12} marginBottom={15}>
                    <Grid  item xs={12}>
                        <Grid container spacing={6}>
                            <ModuleCard/>
                            <ModuleCard2/>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Template;
