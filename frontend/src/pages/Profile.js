import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Paper from "@mui/material/Paper"
import { Divider, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import img from '../images/ku_building_1.jpg'
import Image from '../images/streaksBackground.jpg'
import axios from 'axios'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const Profile = () => {
    const [users, setUsers] = useState([]);

    // useEffect strucutre: https://reactjs.org/docs/hooks-effect.html
    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const res = await axios.get("http://localhost:3003/users")
                setUsers(res.data);
                console.log(res);
            } catch(err) {
                console.log(err);
            }
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
                    {/* // loops through and retreive all users names
                        {users.map(user=>(
                        <div className="user">
                            <h2>{user.fname}</h2>      
                        </div>
                    ))} */}
                </Typography>
            <br /><br />
            <Stack direction="row"

                spacing={4}
                sx={{px:4}}>

                <Item sx={{ px: 5, py: 2 }}>
                    <img src={localStorage.getItem("profilePic") ?
                        localStorage.getItem("profilePic") : img}
                        width={200} height={200} alt='Profile Photo'
                    />
                    <br /><br />
                    {localStorage.getItem("name") ? localStorage.getItem("name") : "FirstName_LastName"}
                    <br />
                    @Username
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

                    <Typography>
                        Email: test@test.com
                    </Typography>
                    <Typography>
                        Cell: XXX-XXX-XXXX
                    </Typography>
                    <Typography>
                        Address: N/A
                    </Typography>
                    <br /><br />
                    <Typography
                        sx={{ fontWeight: 'bold' }}
                    >
                        Security
                    </Typography>
                    <Typography>
                        Birthday: XX_XX_XXXX
                    </Typography>
                    <Typography>
                        Password: XXXXXXXXXX
                    </Typography>

                </Item>
            </Stack>
            <br /> <br/>
            <br /> <br/>
        </div>
    )
}


export default Profile;