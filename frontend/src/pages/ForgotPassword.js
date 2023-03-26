import React, { useState, useRef } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Alert from '@mui/material/Alert';

export default function ForgotPassword() {
    const emailRef = useRef()
    const [error, setError] = useState("")  
    const [loading, setLoading] = useState(false)
    const { resetPassword } = useAuth()
    const [message, setMessage] = useState("")  

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setMessage('')
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further instructions')
        } catch (e) {
            setError("Failed to reset password")
        }

    }

    const handleSendMail = async (e) => {
        try {
            await axios.post("http://localhost:3003/reset-password-email",
                { email: emailRef.current.value });
            setMessage('Check your email for further instructions')
        } catch (e) {
            setMessage('Cannot reset password')
        }
    };

    return (
        <div align="center">
            <Paper className='w-400' sx={{ maxWidth: 600, marginY: 15 }}>
                {error && <Alert severity="danger">{error}</Alert>}
                {message && <Alert severity="success">{message}</Alert>}
                <Typography variant="h6">Enter the email associated with your account: </Typography><br /><br />
                <FormControl>
                    <TextField
                        className='w-200'
                        inputRef={emailRef}
                        type="email"
                        required
                        label='Email'
                    >
                    </TextField>
                    <br /><br />
                    {/* <Button
                        variant="contained"
                        className="w-200"
                        type="submit"
                        onClick={handleSubmit}
                    >
                       Reset Password
                    </Button> */}
                    <Button
                        variant="contained"
                        className="w-200"
                        type="submit"
                        onClick={handleSendMail}
                        sx={{ width: 300, mx: 0.5 }}
                        required
                    >
                        Send reset password email
                    </Button>
                    <br />
                    <Typography>
                     <Link to="/" >Log in here</Link> 
                    </Typography>
                <br /><br />
                </FormControl>
            </Paper>
        </div>
    );
};