import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles';
import UploadImage from "./UrlProfile";
import React, { useEffect, useState } from 'react'
import { Divider } from '@mui/material'
import { useAuth } from '../../context/AuthContext'



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'transparent',
    padding: theme.spacing(1),
  }));

const ModuleCard = (  ) => {
    const [data, setData] = useState([]);
    const { currentUser } = useAuth();
    const user = JSON.parse(currentUser);

    return (
    <Grid item xs={6} marginBottom = {5}>
        <Paper sx = {{opacity:.9, textAlign: 'center'}}>
            <Box 
                padding={2}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    height: 500,
                    backgroundColor: 'lightblue',
                    borderRadius: 1,
                }}
            >
            <Stack spacing={2} 
                   justifyContent="center" 
                   sx={{height: '100%', width: '100%'}}>
                <Item elevation={0}>
                <Stack  
                    direction="row" 
                    justifyContent="center" 
                    sx={{height: '100%', 
                        width: '100%', 
                        textAlign: 'center',}}
                    >
                    <UploadImage/>
                    <br/>
                </Stack>
                </Item>
                <Item sx={{ px: 5, py: 2, textAlign: 'left'}} elevation={0}>
                    <div>
                    <Typography>Name: {user.fname} {user.lname}</Typography>
                    <Typography> Username: @{user.username}</Typography>
                    </div>
                </Item>
            </Stack>
            </Box>
        </Paper>
    </Grid>)
}

export default ModuleCard