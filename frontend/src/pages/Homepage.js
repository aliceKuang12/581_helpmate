import '../App.css';
import { Typography } from '@material-ui/core'; //importing material ui component
import Header from '../components/NavBar'
import TopicCard from '../components/TopicCard'
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Clock from '../components/Clock'
import modules from "./modules.json"
// const Item = styled(Paper)(({ theme }) => ({
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));


const Homepage = () => {
    return (
        <div className="Background" > 
            <div className = "Header">
                <Header />
            </div>,
            
           < Grid className = "Clock" >
                <Clock />
            </Grid>, <br/><br/><br/><br/><br/>
            <div className = "body">
                <Container sx = {{marginY: 5}}>
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