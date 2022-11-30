import React, { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

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
            alert('Check your inbox for further instructions')
            setMessage('Check your inbox for further instructions')
            //alert("Sucessfully signed up!")
        } catch (e) {
            alert("Failed to reset password")
            setError("Failed to reset password")
        }

    }

    return (
        <div align="center">

            <Paper className='w-400' sx={{ maxWidth: 600, marginY: 15 }}>
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
                    <Button
                        variant="contained"
                        className="w-200"
                        type="submit"
                        onClick={handleSubmit}
                    >
                       Reset Password
                    </Button>
                    <br />
                    <Typography>
                     <Link to="/login" >Log in here</Link> 
                    </Typography>
                <br /><br />
                </FormControl>
            </Paper>
        </div>
    );
};