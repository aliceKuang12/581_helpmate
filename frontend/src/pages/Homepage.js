import '../App.css';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core'; //importing material ui component
import Header from '../components/NavBar'
import TopicCard from '../components/TopicCard'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Clock from '../components/Clock'
import modules from "./modules.json"
import Image from '../images/homebackground2.jpeg'
// const Item = styled(Paper)(({ theme }) => ({
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));


const Homepage = (props) => {
    const { user } = props
    return (
        <div style={{ backgroundImage: `url(${Image})`, backgroundSize: "cover" }}> 
            <Header user={user}/>
           <div className = "Clock" >
                <Clock />
            </div>
            <div className = "body">
                <Container>
                    {modules.map((Modules) => (
                        <div key = {Modules}>
                            <Typography
                                variant = "h4"
                                component = "h2"
                                margintop = {5}
                                marginbottom = {3}>
                                    {Modules.name} 
                                </Typography>,
                    
                                <Grid container spacing = {5}>
                                    {Modules.sections.map((section, index) => (
                                        <TopicCard topic={section} key = {index}></TopicCard>
                                    ))}
                            
                                </Grid>
                        </div>
                    ))}
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
