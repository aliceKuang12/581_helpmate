import '../App.css';
import { Typography } from '@material-ui/core'; //importing material ui component
import Header from '../components/NavBar'
import TopicCard from '../components/TopicCard'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Clock from '../components/Clock'
import modules from "./modules.json"
//import Image from '../HomeBackground.jpg'
import Image from '../images/homebackground2.jpeg'
// const Item = styled(Paper)(({ theme }) => ({
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));


const Homepage = () => {
    return (
        <div style={{ backgroundImage: `url(${Image})`, backgroundSize: "cover" }}> 

            <Header />
           <div className = "Clock" >
                <Clock />
            </div>
            <div className = "body">
                <Container>
                    {modules.map((Modules) => (
                        <Typography
                        variant = "h4"
                        component = "h2"
                        marginTop = {5}
                        marginBottom = {3}>
                            {Modules.name} 
                        </Typography>,
             
                        <Grid container spacing = {5}>
                            {Modules.sections.map((section, index) => (
                                <TopicCard topic={section} key = {index}></TopicCard>
                            ))}
                            
                        </Grid>
                    ))}
                </Container>
            </div>
        </div>
    );
}

export default Homepage;
