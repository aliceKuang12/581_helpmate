import React, { useEffect, useState } from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core'; //importing material ui component
import Header from '../components/NavBar'
import TopicCard from '../components//Homepage/TopicCard'
import TopicCard1 from '../components/Homepage/TopicCardv1'
import TopicCard2 from '../components/Homepage/TopicCardv2'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Clock from '../components/Clock'
import Weather from '../components/Weather'
import modules from "./modules.json"
import Image from '../images/homebackground2.jpeg'
import axios from 'axios';
import { useAuth } from '../context/AuthContext';


const Homepage = (props) => {
    const [Academic, setAcademic] = useState([]);
    const [Social, setSocial] = useState([]);
    const [Travel, setTravel] = useState([]);
    const [Health, setHealth] = useState([]);
    const [user1, setUser1] = useState([]);
    const { currentUser } = useAuth();
    const user = JSON.parse(currentUser);
    console.log(user.id);
    // https://stackoverflow.com/questions/52669596/promise-all-with-axios
    useEffect(() => {
        const fetchAllTables = async () => {
            // await axios.get(url)// + localStorage.getItem("email"))
            let URL1 = "http://localhost:3003/academics"
            let URL2 = "http://localhost:3003/healths"
            let URL3 = "http://localhost:3003/travels"
            let URL4 = "http://localhost:3003/social"
            let URL5 = "http://localhost:3003/user"
        
            const promise1 = await axios.get(URL1, {params: {user_id: user.id}}).then(res => {
                setAcademic((res.data.slice(0, 3)));
                console.log(res.data);
            })
                .catch(err => {
                    console.log(err)
                });

            const promise2 = await axios.get(URL2, {params: {user_id: user.id}}).then(res => {
                setHealth((res.data.slice(0, 3)));
                console.log(res.data);
            })
                .catch(err => {
                    console.log(err)
                });

            const promise3 = await axios.get(URL3, {params: {user_id: user.id}}).then(res => {
                setTravel((res.data.slice(0, 3)));
                console.log(res.data);
            })
                .catch(err => {
                    console.log(err)
                });

            const promise4 = await axios.get(URL4, {params: {user_id: user.id}}).then(res => {
                setSocial((res.data.slice(0, 3)));
                console.log(res.data);
            })
                .catch(err => {
                    console.log(err)
                });

            const promise5 = await axios.get(URL5 + localStorage.getItem("email")).then(res => {
                setUser1((res.data.slice(0, 3)));
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
                        {localStorage.getItem("profilePic") ?
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
