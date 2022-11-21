import React, {useState} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
// import _isEmpty from 'lodash/isEmpty';
import { Grid, Typography } from '@material-ui/core';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
//import withStyles from '@mui/styles/withStyles';
// import { AXIOS_HEADER } from '../constants';


const SignUp = (props) => {
    const { 
        isOpen,
        handleClose,
    } = props;
    const [data, setData] = useState({
        fname: '',
        lname: '',
        username: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        dob: '',
        avt: '',
    });

    const {
        username,
        email,
        fname,
        lname,
        password,
        phone,
        address,
        avt,
        dob,
    } = data;
    
    const handleChange = (value, key) => {
        setData(prevState => ({...prevState, [key]: value,}));
    };
    
    const handleCancel = () => {
        setData({
            fname: '',
            lname: '',
            username: '',
            email: '',
            password: '',
            phone: '',
            address: '',
            dob: '',
            avt: '',
        })
        handleClose()
    }

    const handleSubmit = () => {
        // axios({
        //     url: '',
        //     method: 'POST',
        //     headers: AXIOS_HEADER,
        //     params: data,
        // }).then(() => {
            setData({
                fname: '',
                lname: '',
                username: '',
                email: '',
                password: '',
                phone: '',
                address: '',
                dob: '',
                avt: '',
            })
            handleClose();
        // }).catch((e) => {
        //     console.log(e);
        // })
    }

    return (
        <Dialog open={isOpen}>
            <DialogContent>
                <Grid container
                    justifyContent="center" 
                    alignItems="center" 
                    direction="column"
                    sx={{minHeight:"100vh"}}
                >
                    <Grid item>
                    <Typography variant="h5" color="primary">
                        Create a new user
                    </Typography>
                    </Grid>
                    <Grid 
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Paper variant="outline" sx={{padding:'2rem'}}>
                            <Grid item xs={12}>
                            <TextField 
                                id="email" 
                                label="Email" 
                                variant="outlined" 
                                onChange={e => handleChange(e.target.value, 'email')}
                                value={email}
                                fullWidth sx={{marginBottom: '1rem'}}
                            />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing = {3}>
                                    <Grid item xs={6}>
                                        <TextField 
                                            id="fname" 
                                            label="First name" 
                                            variant="outlined"
                                            onChange={e => handleChange(e.target.value, 'fname')}
                                            fullWidth sx={{marginBottom: '1rem'}}
                                            value={fname}
                                            placeholder="First name"
                                            />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField 
                                            id="lname" 
                                            label="Last name" 
                                            variant="outlined" 
                                            onChange={e => handleChange(e.target.value, 'lname')}
                                            value={lname}
                                            fullWidth sx={{marginBottom: '1rem'}}/> 
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    id="username" 
                                    label="Username" 
                                    variant="outlined" 
                                    onChange={e => handleChange(e.target.value, 'username')}
                                    value={username}
                                    fullWidth sx={{marginBottom: '1rem'}}/>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing = {3}>
                                    <Grid item xs={6}>
                                        <TextField 
                                            id="password" 
                                            label="Password" 
                                            variant="outlined"
                                            onChange={e => handleChange(e.target.value, 'password')}
                                            value={password}
                                            fullWidth sx={{marginBottom: '1rem'}}/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField 
                                            id="password-cf" 
                                            label="Password Confirmation" 
                                            variant="outlined"
                                            fullWidth sx={{marginBottom: '1rem'}}/>
                                    </Grid>
                                </Grid>
                                
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    id="phone" 
                                    label="Phone number" 
                                    variant="outlined"
                                    onChange={e => handleChange(e.target.value, 'phone')}
                                    value={phone}
                                    fullWidth sx={{marginBottom: '1rem'}}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    id="dob" 
                                    label="Date of birth" 
                                    variant="outlined" 
                                    onChange={e => handleChange(e.target.value, 'dob')}
                                    value={dob}
                                    fullWidth sx={{marginBottom: '1rem'}}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    id="address" 
                                    label="Address"
                                    variant="outlined"
                                    onChange={e => handleChange(e.target.value, 'address')}
                                    value={address}
                                    fullWidth sx={{marginBottom: '1rem'}}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    id="avt" 
                                    label="Profile Picture" 
                                    variant="outlined" 
                                    value={avt}
                                    fullWidth 
                                    sx={{marginBottom: '1rem'}}
                                />
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleCancel}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                >
                    Sign Up
                </Button>
            </DialogActions>
        </Dialog>
    )
}

SignUp.defaultProps = {
    isOpen: false,
    handleClose: () => {},
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
    isOpen: PropTypes.bool,
    handleClose: PropTypes.func,
};  

export default SignUp;