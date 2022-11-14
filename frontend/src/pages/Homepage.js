import logo from '../logo.svg';
import '../App.css';
import Header from '../components/NavBar'
import Text from '../components/Text'
import TestClass from '../components/TestClass'
import UserName from '../components/UserName'
import { Button, Typography } from '@material-ui/core'; //importing material ui component
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
            <div className="MenuBackground">

            </div>
            <Header/>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Item>
                        <table>
                            <tr>
                                <td>
                                    <box>
                                        &ensp;Top Alerts&ensp;
                                        <card>&ensp;new card&ensp;</card>
                                    </box>
                                    <space>&ensp;</space>
                                    <box>
                                        &ensp;Academics&ensp;
                                        <card>&ensp;new card&ensp;</card>
                                    </box>
                                    <space>&ensp;</space>
                                    <box>
                                        &ensp;Health&ensp;
                                        <card>&ensp;new card&ensp;</card>
                                    </box>
                                    <br></br>
                                </td>
                            </tr>
                        </table>
                    </Item>
                </Grid>
                <Grid item xs={12}>
                    <Item><table>
                        <tr>
                            <td>
                                <box>
                                    &ensp;Top Alerts&ensp;
                                    <card>&ensp;new card&ensp;</card>
                                </box>
                                <space>&ensp;</space>
                                <box>
                                    &ensp;Academics&ensp;
                                    <card>&ensp;new card&ensp;</card>
                                </box>
                                <space>&ensp;</space>
                                <box>
                                    &ensp;Health&ensp;
                                    <card>&ensp;new card&ensp;</card>
                                </box>
                                <br></br>
                            </td>
                        </tr>
                    </table></Item>
                </Grid>
            </Grid>

        </div>
    );
}

export default Homepage;