import { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { Typography, Container, TextField, Box, Paper } from "@mui/material";
import Button from '@mui/material/Button';
import BasicForm from "../components/BasicForm";
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Login = (props) => {
    const navigate = useNavigate()
    const { login } = useAuth()
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState("")
    const onClickLogin = () => {
        if (!(passwordRef.current.value && emailRef.current.value )) {
            setError("Empty field(s) exist")
            alert(error);
        } else {
            handleLogin();
        }
    }
    const handleLogin = async (e) => {
        try {
            await login(emailRef.current.value, passwordRef.current.value);
            navigate({
                pathname: '/',
            },)
        } catch (e) {
            alert(e);
        }
    }
    const handleChange = (value) => {
        props.setCurrentUser(value);
    }
    return (
        <Container className="LoginPage" sx={{width: 1300, height: 1000}}>
            <br/><br/><br/>
            <Paper elevation={9} sx={{ width: 600, height: 800}}>
            
            <Box >
                <br/><br/> <br/><br/><br/>
                <Typography 
                    variant="h3" 
                    component="h2" 
                    sx={{ marginX: 23 }}
                >
                    Help Mate 
                </Typography>
                <Typography 
                    variant="body1" 
                    component="p" 
                    sx={{ marginY: 3, marginX: 27 }}>
                    Here to help you!
                </Typography>
            </Box>
            <br/>
            <Box sx={{ marginY: 5, marginX: 23 }}>
                <TextField 
                    id="outlined-basic" 
                    label="Enter username" 
                    variant="filled" 
                    onChange={e => handleChange(e.target.value)}
                    required
                />
                <br /> <br />
                <TextField 
                    id="outlined-basic"
                    label="Enter email"
                    inputRef={emailRef}
                    variant="filled"
                    // onChange={e => handleChange(e.target.value)}
                />
                <br /> <br />
                <TextField 
                    id="outlined-basic" 
                    label="Enter password"
                    type="password"
                    inputRef={passwordRef}
                    variant="filled"
                    required
                />
                <Typography 
                    variant="caption" 
                    component="p" 
                    sx={{marginTop: 1, marginLeft: 11, color: "blue", fontSize: 14}}
                    >
                    <Link to="/forgot-password">Forgot Password? </Link>
                </Typography>
                <br/><br/><br/>
                <Button 
                    variant="contained" 
                    label="Password" 
                    type="password" 
                    className="w-100"
                    onClick={onClickLogin}
                    sx={{ width: 200, mx: 2}}
                    required
                >
                    Log In
                </Button>
                <br/>
                <br/>
                <br/>
            </Box>
            <Box sx={{mx: 25}}>

                <BasicForm/>
            </Box>
            </Paper>
        </Container>
    );
}

Login.propTypes = {
    setCurrentUser: PropTypes.func.isRequired,
}

export default Login;