import '../App.css';
import { Typography } from '@material-ui/core'; //importing material ui component
import Header from '../components/NavBar'
import TopicCard from '../components/TopicCard'
import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
// import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import modules from "./modules.json"

// const Item = styled(Paper)(({ theme }) => ({
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));


const Homepage = () => {

    return (
        <div className="Background">
            <div className = "Header">
                <Header/>
            </div>
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
                    <Box>
            
                    </Box>
                </Container>
            </div>
        </div>
    );
}

export default Homepage;