import React from 'react'
import NavBar from '../components/NavBar'
import Image from '../images/streaksBackground.jpg'
import ModuleCard from '../components/Profile/ProfileCard1'
import ModuleCard2 from '../components/Profile/ProfileCard2'
import Grid from "@mui/material/Grid"
import '../App.css';
import Clock from '../components/Clock'


const Profile = () => {
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

export default Profile;

/*
             {users.map(user=>{
                    <div className='user'>
                        <p>{user.fname}</p>
                        {/* //{user.email==localStorage.getItem("name") ? user.email: "no"} 
                      </div>
      */
