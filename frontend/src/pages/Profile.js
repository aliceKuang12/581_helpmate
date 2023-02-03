import React from 'react'
import NavBar from '../components/NavBar'
import Paper from "@mui/material/Paper"
import { Typography } from '@mui/material'

const Profile = () => {
  return (
    <div>
        <NavBar/>
        <br/> <br/>
        <Paper>
            <Typography>
            Profile
            </Typography>
        </Paper>
    </div>
  )
}


export default Profile;