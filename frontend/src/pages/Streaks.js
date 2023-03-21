import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Grid from "@mui/material/Grid"
import NavBar from '../components/NavBar'
import '../App.css';
import Clock from '../components/Clock'
import Image from '../images/streaksBackground.jpg'
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Typography } from "@material-ui/core";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.h4,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    width: '80%',
    height: 100,
}));

const Streaks = () => {
    const [assign, setAcademic] = useState([]);
    const [steps, setSteps] = useState([]);
    const [activities, setActivities] = useState([]);
    //const assign = Json.parse()
    const assignStreak = assign.map(
        (info) => {
            return (
                <Typography sx={{ fontSize: 18, fontWeight: 'medium' }}> * {info.streak} assignments completed!</Typography>
            )
        }
    )

    const stepStreak = steps.map(
        (info) => {
            return (
                <Typography sx={{ fontSize: 24 }}> * {info.streak} day steps streak!</Typography>
            )
        }
    )

    const activityStreak = activities.map(
        (info) => {
            return (
                <Typography sx={{ fontSize: 18 }}> * {info.streak} day activity streak!</Typography>
            )
        }
    )
    // https://stackoverflow.com/questions/52669596/promise-all-with-axios
    useEffect(() => {
        const fetchAllTables = async () => {
            // await axios.get(url)// + localStorage.getItem("email"))
            let URL1 = "http://localhost:3003/academics/streak1/"
            let URL2 = "http://localhost:3003/health/streak1/"
            let URL3 = "http://localhost:3003/health/streak2/"
            //  let URL4 = "http://localhost:3003/social/"

            const promise1 = await axios.get(URL1 + localStorage.getItem("email")).then(res => {
                setAcademic((res.data));
                console.log(res.data);
            })
                .catch(err => {
                    console.log(err)
                });

            const promise2 = await axios.get(URL2 + localStorage.getItem("email")).then(res => {
                setActivities((res.data));
                console.log(res.data);
            }).catch(err => {
                console.log(err)
            });

            const promise3 = await axios.get(URL3 + localStorage.getItem("email")).then(res => {
                setSteps((res.data));
                console.log(res.data);
            }).catch(err => {
                console.log(err)
            });

            // const promise4 = await axios.get(URL4+ localStorage.getItem("email")).then(res => {
            //     setSocial((res.data));
            //     console.log(res.data);
            // })
            //     .catch(err => {
            //         console.log(err)
            //     });   promise3

            Promise.all([promise1, promise2, promise3]).then(function (values) {
                console.log(values);
            });
        }
        fetchAllTables()
    }, []);


    return (
        <div style={{
            backgroundImage: `url(${Image})`,
            backgroundSize: "cover",
            padding: 2
        }}>
            <NavBar></NavBar>
            <Clock />
            <Box padding={2} marginX={2} marginY={2} sx={{ height: 600, width: 600, alignItems: 'center' }}>
                <Stack spacing={.25} marginX={2} sx={{  }}>
                    <Item sx={{ backgroundColor: 'lightblue' }}>
                        <Typography sx={{fontWeight: 'bold'}}>Academics</Typography>
                        {assignStreak}
                    </Item>
                    <br />
                    <Item sx={{ backgroundColor: '#ffff66', mr: 10 }}>
                        <Typography>Health</Typography>
                        {stepStreak}
                        {activityStreak}
                    </Item>
                    <br />
                    <Item sx={{ backgroundColor: 'lightgreen' }}>
                        <Typography>Social</Typography>
                    </Item>
                    <br />
                    <Item sx={{ backgroundColor: 'lightcoral' }}>
                        <Typography>Travel</Typography>
                    </Item>
                </Stack>
            </Box>
        </div>
    );
}

export default Streaks;