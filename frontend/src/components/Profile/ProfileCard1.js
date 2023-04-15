import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles';
import UpdateUser from "./EditProfileInfo"
import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'transparent',
    padding: theme.spacing(1),
  }));

const ModuleCard = ( ) => {
    // https://youtu.be/fPuLnzSjPLE?t=1335
    //get User from the Context, then display data
    const [data, setData] = useState([]);
    const { currentUser } = useAuth();
    const user = JSON.parse(currentUser);

    const date = user.birthday.slice(5,10);
    const year = user.birthday.slice(0, 4);

    return (
    <Grid item xs={6} marginBottom = {5}>
        <Paper sx = {{opacity:.9}}>
            <Box 
                padding={2}
                sx={{
                    display: "flex",
                    alignItems: "left",
                    height: 500,
                    backgroundColor: 'lightblue',
                    borderRadius: 1,
                }}
            >
            <Stack spacing={24} sx={{height: '100%', width: '100%',}}>
            <Item elevation={0} sx={{
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
                        <Typography> Username: @{user.username}</Typography>
                        <Typography>Email: {user.email}</Typography>
                        <Typography>Cell: {user.cell ? user.cell : "N/a"}</Typography>
                        <Typography>Address: {user.address=='Undefined' ? "N/a" : user.address}</Typography>

                        <br />

                        <Typography sx={{ fontWeight: 'bold' }}>
                            Security
                        </Typography>
                        <Typography> Birthday:  {date}-{year}</Typography>
                        {/* <Typography>Password: {currentUser.password}</Typography> */}
                        
                    </div>
                    <br/><br/> <br/><br/> <br/><br/> <br/><br/>
                    <UpdateUser/>
                </Item>
                <Item elevation={0}>
                <Stack spacing={2} 
                    direction="row" 
                    justifyContent="center" 
                    sx={{height: '100%', 
                        width: '100%', 
                        textAlign: 'center',}}
                    >
                   
                </Stack>
                </Item>
            </Stack>
            </Box>
        </Paper>
    </Grid>)
}

export default ModuleCard