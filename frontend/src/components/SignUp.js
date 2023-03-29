import React, { useState, useRef } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import _isEmpty from 'lodash/isEmpty';
import { Grid, Typography } from '@material-ui/core';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
//import withStyles from '@mui/styles/withStyles';
import { AXIOS_HEADER } from '../constants';
import { useAuth } from '../context/AuthContext'
import { DATE_REGEX } from '../constants';

const SignUp = (props) => {
    const { 
        isOpen,
        handleClose,
    } = props;
    const { signup } = useAuth()
   // const { deleteuser } = useAuth()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [error, setError] = useState("")
    const [data, setData] = useState({
        fname: '',
        lname: '',
        username: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        birthday: '',
        token:'',
        //profilePic: ''
    });

    const {
        username,
        email,
        fname,
        lname,
        password,
        phone,
        address,
       // profilePic,
        token,
        birthday,
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
            birthday: '',
            token: '',
            profilePic: ''
        })
        handleClose()
    }
    const validateDate = (dateStr) => {
        if (dateStr.match(DATE_REGEX) === null) {
            setError("Invalid birthday format");
            alert("Invalid birthday format");
            return false;
        }
        return true;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordConfirmRef.current.value !== passwordRef.current.value) {
            alert('Passwords do not match!')
            setError('Passwords do not match!')
        } else if (validateDate(birthday)) {
            try {
                const res = await signup(emailRef.current.value, passwordRef.current.value);
                if (res) {
                    handleData({token: res, ...data});
                }
            } catch (e) {
                alert(e)
            }
        }
    }
    
    const handleData = (db) => {
        if (_isEmpty(db.birthday)) {
            db.birthday = '0001-01-01'
        }
        axios({
            url: 'http://localhost:3003/signup',
            method: 'POST',
            headers: AXIOS_HEADER,
            data: db,
        }).then(() => {
            alert("Sucessfully signed up!")
            setData({
                fname: '',
                lname: '',
                username: '',
                email: '',
                password: '',
                phone: '',
                address: '',
                birthday: '',
               // profilePic: '',
            })
            handleClose();
        }).catch((e) => {
            console.log(e);
        })
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
                                inputRef={emailRef}
                                onChange={e => handleChange(e.target.value, 'email')}
                                value={email}
                                fullWidth sx={{marginBottom: '1rem'}}
                                required
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
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField 
                                            id="lname" 
                                            label="Last name" 
                                            variant="outlined" 
                                            onChange={e => handleChange(e.target.value, 'lname')}
                                            value={lname}
                                            fullWidth sx={{marginBottom: '1rem'}}
                                            required
                                        /> 
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
                                    fullWidth sx={{marginBottom: '1rem'}}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing = {3}>
                                    <Grid item xs={6}>
                                        <TextField 
                                            id="password" 
                                            label="Password" 
                                            variant="outlined"
                                            inputRef={passwordRef}
                                            type="password"
                                            onChange={e => handleChange(e.target.value, 'password')}
                                            value={password}
                                            fullWidth sx={{marginBottom: '1rem'}}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField 
                                            id="password-cf" 
                                            label="Password Confirmation" 
                                            variant="outlined"
                                            inputRef={passwordConfirmRef}
                                            type="password" 
                                            fullWidth sx={{marginBottom: '1rem'}}
                                            required
                                        />
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
                                    onChange={e => handleChange(e.target.value, 'birthday')}
                                    value={birthday}
                                    placeholder="yyyy-mm-dd"
                                    fullWidth sx={{marginBottom: '1rem'}}
                                    required
                                    // helperText={validateDate(birthday) ? '': "Please follow formate YYYY-MM-DD"}
                                    // error={!validateDate(birthday)}

                                />
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
                    
                            {/* <Grid item xs={12}>
                                <TextField 
                                    id="avt" 
                                    label="Profile Picture" 
                                    variant="outlined" 
                                    value={profilePic}
                                    fullWidth sx={{marginBottom: '1rem'}}
                                />
                            </Grid> */}
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
    isOpen: PropTypes.bool,
    handleClose: PropTypes.func,
};  

export default SignUp;