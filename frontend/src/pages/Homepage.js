import logo from '../logo.svg';
import '../App.css';
import Text from '../components/Text'
import TestClass from '../components/TestClass'
import UserName from '../components/UserName'
import { Button, Typography } from '@material-ui/core'; //importing material ui component
import Header from '../components/NavBar'

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));




const Homepage = () => {

    return (
        <div className="Background">
            <Header></Header>
            
           

        </div>
    );
}

export default Homepage;