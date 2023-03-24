import React, { useEffect, useState } from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core'; //importing material ui component
import Header from '../components/NavBar'
import TopicCard from '../components/TopicCard'
import TopicCard1 from '../components/TopicCardv1'
import TopicCard2 from '../components/TopicCardv2'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Clock from '../components/Clock'
import Weather from '../components/Weather'
import modules from "./modules.json"
import Image from '../images/homebackground2.jpeg'
import axios from 'axios';


const Homepage = (props) => {
    const [Academic, setAcademic] = useState([]);
    const [Social, setSocial] = useState([]);
    const [Travel, setTravel] = useState([]);
    const [Health, setHealth] = useState([]);
    const [user1, setUser1] = useState([]);


    // https://stackoverflow.com/questions/52669596/promise-all-with-axios
    useEffect(() => {
        const fetchAllTables = async () => {
            // await axios.get(url)// + localStorage.getItem("email"))
            let URL1 = "http://localhost:3003/academics/"
            let URL2 = "http://localhost:3003/health/"
            let URL3 = "http://localhost:3003/travel/"
            let URL4 = "http://localhost:3003/social/"
            let URL5 = "http://localhost:3003/user/"

            const promise1 = await axios.get(URL1 + localStorage.getItem("email")).then(res => {
                setAcademic((res.data));
                console.log(res.data);
            })
                .catch(err => {
                    console.log(err)
                });

            const promise2 = await axios.get(URL2 + localStorage.getItem("email")).then(res => {
                setHealth((res.data));
                console.log(res.data);
            })
                .catch(err => {
                    console.log(err)
                });

            const promise3 = await axios.get(URL3 + localStorage.getItem("email")).then(res => {
                setTravel((res.data));
                console.log(res.data);
            })
                .catch(err => {
                    console.log(err)
                });

            const promise4 = await axios.get(URL4 + localStorage.getItem("email")).then(res => {
                setSocial((res.data));
                console.log(res.data);
            })
                .catch(err => {
                    console.log(err)
                });

            const promise5 = await axios.get(URL5 + localStorage.getItem("email")).then(res => {
                setUser1((res.data));
                console.log(res.data);
            })
                .catch(err => {
                    console.log(err)
                });

            Promise.all([promise1, promise2, promise3, promise4, promise5]).then(function (values) {
                console.log(values);
            });
        }
        fetchAllTables()
    }, []);

    return (
        <div style={{ backgroundImage: `url(${Image})`, backgroundSize: "cover" }}>
            <Header />
            <Clock />
            <Weather />
            <br /><br />
            <div className="body">



                <Container>
                    <Grid container spacing={5}>
                        {localStorage.getItem("name") ?
                            <TopicCard1 topic="My Profile" dbObject={user1}></TopicCard1> :
                            <TopicCard2 topic="Top Alerts" ></TopicCard2>
                        }
                        <TopicCard topic="Academics" dbObject={Academic}></TopicCard>
                        <TopicCard topic="Health" dbObject={Health}></TopicCard>
                        <TopicCard2 topic="Notes" ></TopicCard2>
                        <TopicCard topic="Travel" dbObject={Travel}></TopicCard>
                        <TopicCard topic="Social" dbObject={Social}></TopicCard>

                    </Grid>
                </Container>
            </div>
        </div>
    );
}

Homepage.defaultProps = {
    user: ''
}

Homepage.propTypes = {
    user: PropTypes.string
}

export default Homepage;
