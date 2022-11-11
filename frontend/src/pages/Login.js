import { Typography, Container, TextField, Box, Paper } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Button from '@mui/material/Button';
// import CreateAccount from "../components/CreateAccount";
import BasicForm from "../components/BasicForm";
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
                <TextField id="outlined-basic" label="Enter username" variant="filled" />
                <br /> <br />
                <TextField id="outlined-basic" label="Enter password" type="password" variant="filled" />
                <Typography variant="caption" component="p" 
                            sx={{marginTop: 1, marginLeft: 11, color: "blue", fontSize: 14}}
                            onClick={() => {alert('User authentication, future sprint'); }}>
                    Forgot Password?
                </Typography>
                <br/><br/><br/>
                <Button variant="contained" label="Password" type="password" className="LoginButtons"
                         sx={{ marginLeft: 8 }}
                         onClick={() => {alert('clicked'); }}>
                    Login
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

export default Login;