import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Paper from "@mui/material/Paper"
import { Divider, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import img from '../images/ku_building_1.jpg'
import Image from '../images/streaksBackground.jpg'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
//import JsonData from './user1.json'
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const Profile = () => {
    // https://youtu.be/fPuLnzSjPLE?t=1335
    //get User from the Context, then display data
    const [data, setData] = useState([]);
    const { currentUser } = useAuth();
    const user = JSON.parse(currentUser);

    return (
        <div style={{
            backgroundImage: `url(${Image})`,
            backgroundSize: "cover"
        }}>
            <NavBar />

            <Typography
                sx={{
                    textAlign: 'left',
                    fontSize: 'h6.fontSize',
                    px: 4,
                    mt: 4
                }}
            >
                My Profile
            </Typography>
            <br /><br />
            <Stack direction="row"

                spacing={4}
                sx={{ px: 4 }}>

                <Item sx={{ px: 5, py: 2 }}>
                    <img src={localStorage.getItem("profilePic") ?
                        localStorage.getItem("profilePic") : img}
                        width={200} height={200} alt='Profile Photo'
                    />
                    <br /><br />
                    <div>
                    <Typography>Name: {user.fname} {user.lname}</Typography>
                    <Typography> Username: @{user.username}</Typography>
                    </div>
                </Item>

                <Item sx={{
                    textAlign: 'left',
                    width: "60%",
                    px: 2,
                    py: 2
                }}
                >
                    <Typography
                        sx={{ fontWeight: 'bold' }}
                    >
                        Contact Information
                    </Typography>
                    <div>
                        <Typography>Name: {user.fname} {user.lname}</Typography>

                        <Typography> Username: {user.username}</Typography>
                        <Typography>Email: {user.email}</Typography>
                        <Typography>Cell: {user.cell ? user.cell : "N/a"}</Typography>
                        <Typography>Address: {user.address=='Undefined' ? "N/a" : user.address}</Typography>

                        <br />

                        <Typography sx={{ fontWeight: 'bold' }}>
                            Security
                        </Typography>
                        <Typography> Birthday: {user.birthday} </Typography>
                        {/* <Typography>Password: {currentUser.password}</Typography> */}

                    </div>
                </Item>
            </Stack>
            <br /> <br />
            <br /> <br />
        </div>
    )
}

export default Profile;

/*
             {users.map(user=>{
                    <div className='user'>
                        <p>{user.fname}</p>
                        {/* //{user.email==localStorage.getItem("name") ? user.email: "no"} 
                      </div>
      */