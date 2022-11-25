import ModuleCard from '../components/TravelCard1'
import ModuleCard2 from '../components/TravelCard2'
import Grid from "@mui/material/Grid"
import NavBar from '../components/NavBar'
import '../App.css';
import Clock from '../components/Clock'
//import Image from '../images/BirdBackground.jpg'
import Image from '../images/Greece.jpg'
import TravelInfo from './travel.json'

const Template = () => {
    return(
        <div style={{ backgroundImage: `url(${Image})`, 
        backgroundSize: "cover" }}>
            <NavBar></NavBar>
            <Clock/>         
            <Grid container spacing={12}>
                <Grid  item xs={12} marginX = {5} marginBottom = {5}>
                    <Grid container spacing={6}>
                        <ModuleCard />
                        <ModuleCard2/>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Template;