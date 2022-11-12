import logo from '../logo.svg';
import '../App.css';
import Text from '../components/Text'
import TestClass from '../components/TestClass'
import UserName from '../components/UserName'
import { Button, Typography } from '@material-ui/core'; //importing material ui component
import Header from '../components/NavBar'
import TourCard from '../components/TourCard'

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import modules from "./modules.json"

const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));




const Homepage = () => {

    return (
        <div className="Background">
            <div className = "Header">
                <Header></Header>
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
                            <TourCard tour={section} key = {index}></TourCard>
                        ))}
                        </Grid>
                    ))}
                </Container>
            </div>
        </div>
    );
}

export default Homepage;