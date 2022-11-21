import React, { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import SignUp from '../components/SignUp';
//use methods from authcontext to handle the submit

const SimpleSignUp = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordConfirmRef.current.value !== passwordRef.current.value) {
            setError('Passwords do not match!')
        } else {

            try {
                setError("")
                await signup(emailRef.current.value, passwordRef.current.value)
                alert("Sucessfully signed up!")
            } catch (e) {
                alert(e)
            }
        }
    }
    console.log(error)
    return (
        <div align="center">
            <Paper className='w-400' sx={{maxWidth: 400}}>
                <Typography variant="h2">Sign Up</Typography><br/>
                <FormControl>
                    <TextField 
                        className='w-100' 
                        inputRef={emailRef} 
                        type="email" 
                        required
                        label='Email'
                    > 
                    </TextField>
                    <br/><br/>
                    <TextField 
                        className='w-100' 
                        inputRef={passwordRef} 
                        type="password" 
                        required
                        label='Password'
                    > 
                    </TextField>
                    <br/><br/>
                    <TextField 
                        className='w-100' 
                        inputRef={passwordConfirmRef} 
                        type="password" 
                        required
                        label='Password Confirmation'
                    > 
                    </TextField>
                    <br/><br/>
                    <Button 
                        variant="contained" 
                        className="w-100" 
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Create User
                    </Button>
                    <br/><br/>
                </FormControl>
                <Typography>
                    Have an account? Log in 
                    <Link to="/login" >here</Link> .
                </Typography>
                <br/><br/>
            </Paper>
        </div>

    )
}

export default SimpleSignUp;
// export default (SignUp);