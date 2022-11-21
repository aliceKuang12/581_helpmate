import React, { useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import { Button } from '@mui/material';
//import withStyles from '@mui/styles/withStyles';
import { Link } from 'react-router-dom'
//use methods from authcontext to handle the submit

const SimpleSignUp = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    
    return (
        <div align="center">
            <Paper className='w-400' sx={{maxWidth: 400}}>
            <Typography variant="h2">Sign Up</Typography><br/>
            <FormControl>
            Email <TextField className='w-100' inputRef={emailRef} type="email" required> </TextField><br/><br/>
            Password <TextField className='w-100' inputRef={passwordRef} type="password" required>  </TextField><br/><br/>
            Password Confirm <TextField className='w-100' inputRef={passwordConfirmRef} type="password" required>  </TextField><br/><br/>
            <Button variant="contained" className="w-100" type="submit">Create User</Button>
            <br/><br/>
            </FormControl>
            <Typography>
                Have an account? Log in <Link to="/login" >here</Link> .
            </Typography><br/><br/>
            </Paper>
        </div>

    )
}

export default SimpleSignUp;
// export default (SignUp);