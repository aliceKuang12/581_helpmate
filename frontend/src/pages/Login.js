import { Typography, Container, TextField, Box, Paper } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Button from '@mui/material/Button';
const theme = createTheme({
    typography: {
        fontSize: 32,
    },
});

const Login = () => {
    return (
        <Container className="LoginPage" sx={{width: 1300, height: 1000}}>
            <br/><br/><br/>
            <Paper elevation={9} sx={{ width: 600, height: 800}}>
            
            <Box >
                <br/><br/> <br/><br/><br/>
                <Typography variant="h3" component="h2" sx={{ marginX: 23 }}>
                    HelpMate 
                </Typography>
                <Typography variant="body1" component="p" sx={{ marginY: 3, marginX: 27 }}>
                    Here to help you!
                </Typography>
            </Box>
            <br/>
            <Box sx={{ marginY: 5, marginX: 23 }}>
                <TextField id="outlined-basic" label="Username" variant="filled" />
                <br /> <br />
                <TextField id="outlined-basic" label="Password" type="password" variant="filled" />
                <Typography variant="caption" component="p" 
                            sx={{marginLeft: 12, color: "blue", fontSize: 14}}
                            onClick={() => {alert('User authentication, future sprint'); }}>
                    Reset Password
                </Typography>
                <br/><br/><br/>
                <Button variant="contained" label="Password" type="password"
                         sx={{ marginLeft: 8 }}
                         onClick={() => {alert('clicked'); }}>
                    Login
                </Button>
                <br/>
                <Button variant="contained" 
                sx={{ marginTop: 8, marginLeft: 3 }}
                        onClick={() => {alert('clicked'); }}>
                Create Account</Button>
            </Box>
            </Paper>
        </Container>
    );
}

export default Login;