import React, { useEffect, useState } from 'react'
import ModuleCard2 from '../components/Academic/AcademicCard1'
import ModuleCard from '../components/Academic/AcademicCard2'
import Grid from "@mui/material/Grid"
import NavBar from '../components/NavBar'
import '../App.css';
import Clock from '../components/Clock'
import Image from '../images/ku1.jpg'
import axios from 'axios'

const Template = () => {
    return(
        <div style={{ backgroundImage: `url(${Image})`, 
        backgroundSize: "1200px 900px"}}>
            <NavBar/>
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