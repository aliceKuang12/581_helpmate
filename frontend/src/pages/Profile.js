import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Paper from "@mui/material/Paper"
import { Divider, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import img from '../images/ku_building_1.jpg'
import Image from '../images/streaksBackground.jpg'
import axios from 'axios'
import JsonData from './user1.json'
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const Profile = () => {
    // https://youtu.be/fPuLnzSjPLE?t=1335
    const [data, setData] = useState([]);

    const DisplayNames = data.map(
        (info) => {
            return (
                <div>
                    <Typography>Name: {info.fname} {info.lname}</Typography>
                    <Typography> Username: @{info.username}</Typography>
                </div>
            )
        }
    )

    const DisplayData = data.map(
        (info) => {
            return (<div>
                <Typography>Name: {info.fname} {info.lname}</Typography>

                <Typography> Username:{info.username}</Typography>
                <Typography>Email: {info.email}</Typography>
                <Typography>Cell: {info.cell ? info.cell : "N/a"}</Typography>
                <Typography>Address: {info.address=='Undefined' ? "N/a" : info.address}</Typography>

                <br />

                <Typography sx={{ fontWeight: 'bold' }}>
                    Security
                </Typography>
                <Typography> Birthday: {info.birthday} </Typography>
                <Typography>Password: {info.password}</Typography>

            </div>
            )
        }
    )
    // useEffect strucutre: https://reactjs.org/docs/hooks-effect.html
    useEffect(() => {
        const fetchAllUsers = async () => {
            await axios.get("http://localhost:3003/user/" + localStorage.getItem("email"))
                .then(res => {
                    setData((res.data));
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err)
                })
        }
        fetchAllUsers()
    }, []);



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
                    {DisplayNames}
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
                    {DisplayData}


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