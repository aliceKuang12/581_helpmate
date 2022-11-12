import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
// import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
//import withStyles from '@mui/styles/withStyles';

function SignUp() {
  return (
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
            <CreateForm/>
        </Grid>
    )
}
const styles = {
    paper: {
        padding: '1rem',
    },
}

const CreateForm = (props) => {
    const { classes } = props;
    const [data, setData] = useState({
        // fname: fname || '',
        // lname: fname || '',
        // username: email || '',
        // email: email || '',
        // password: password || '',
        // phone: phone || '',
        // address: address || '',
        // dob: dob || '',
        // avt: avt || null,
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

    React.useEffect(() => {
    setData({
        fname: fname || '',
        lname: fname || '',
        username: email || '',
        email: email || '',
        password: password || '',
        phone: phone || '',
        address: address || '',
        dob: dob || '',
        avt: avt || null,
    });
    }, []);

    const handleChange = (value, key) => {
        setData(prevState => ({...prevState, [key]: value,}));
    };

  return (
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
            {/* <Button 
                text="Sign Up"
                variant="outlined"
                sx={{marginBottom:'1em'}}
            >
                Sign Up
            </Button> */}
        </Paper>
    </Grid>
  )
}

CreateForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };  

export default SignUp;
// export default (SignUp);