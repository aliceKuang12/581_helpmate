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

export default function ResetPassword() {
    const newPasswordRef = useRef()
    const emailRef = useRef();
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
            await resetPassword(emailRef.current.value, newPasswordRef.current.value)
            setMessage('Your password has been updated!')
        } catch (e) {
            setError("Failed to reset password")
        }

    }

    return (
        <div align="center">
            <Paper className='w-400' sx={{ maxWidth: 600, marginY: 15 }}>
                {error && <Alert severity="danger">{error}</Alert>}
                {message && <Alert severity="success">{message}</Alert>}
                <Typography variant="h6">Enter the email associated with your account and your new pasword: </Typography><br /><br />
                <FormControl>
                    <TextField
                        className='w-200'
                        inputRef={emailRef}
                        type="email"
                        required
                        label='Email'
                    >
                    </TextField>
                    <br/><br/>
                    <TextField
                        className='w-200'
                        inputRef={newPasswordRef}
                        type="password"
                        required
                        label='Password'
                    >
                    </TextField>
                    <br /><br />
                    <Button
                        variant="contained"
                        className="w-200"
                        type="submit"
                        onClick={handleSubmit}
                    >
                       Confirm reset Password
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