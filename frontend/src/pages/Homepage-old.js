import React, { useEffect, useState } from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core'; //importing material ui component
import Header from '../components/NavBar'
import TopicCard from '../components/TopicCard'
import TopicCard2 from '../components/TopicCardv2'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Clock from '../components/Clock'
import Weather from '../components/Weather'
import modules from "./modules.json"
import Image from '../images/homebackground2.jpeg'



const Homepage = (props) => {
    const { user } = props
    return (
        <div style={{ backgroundImage: `url(${Image})`, backgroundSize: "cover" }}>
            <Header user={user} />
            <Clock />
            <Weather />
            <div className="body">
                <Container>
                {modules.map((Modules) => (
                        <div key = {Modules}>
                            <Typography
                                variant = "h4"
                                component = "h2"
                                margintop = {5}
                                marginbottom = {3}
                                color = "#FFFFFF">
                                    {Modules.name} 
                                </Typography>,
                    
                                <Grid container spacing = {5}>
                                    {Modules.sections.map((section, index) => (
                                        <TopicCard topic={section} key = {index}></TopicCard>
                                    ))}
                            
                                </Grid>
                        </div>
                    ))}
                
                </Container>
            </div>
        </div>
    );
}

Homepage.defaultProps = {
    user: ''
}

Homepage.propTypes = {
    user: PropTypes.string
}

export default Homepage;