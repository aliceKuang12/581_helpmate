import React, { useEffect, useState } from 'react'
import ModuleCard2 from '../components/AcademicCard1'
import ModuleCard from '../components/AcademicCard2'
import Grid from "@mui/material/Grid"
import NavBar from '../components/NavBar'
import '../App.css';
import Clock from '../components/Clock'
import Image from '../images/BirdBackground.jpg'
import axios from 'axios'

const Template = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchAllAcademic = async () => {
            await axios.get("http://localhost:3003/academics/")
                .then(res => {
                    //setData((res.data));
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err)
                })
        }
        fetchAllAcademic()
    }, []);

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