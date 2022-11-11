import { Typography, Container, TextField, Box } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Button from '@mui/material/Button';
const theme = createTheme({
    typography: {
        fontSize: 32,
    },
});

const Login = () => {
    return (
        <Container>
            <Box sx={{ marginY: 5, marginX: 23, marginTop: 15 }}>
                <Typography variant="h4" component="h2">
                    HelpMate Login
                </Typography></Box>

            <Box sx={{ marginY: 5, marginX: 25 }}>
                <TextField id="filled-basic" label="Username" variant="filled" />
                <br /> <br />
                <TextField id="filled-basic" label="Password" variant="filled" />
            </Box>
            
            <Box sx={{ marginTop: 10, marginX: 33 }}>
                <Button variant="contained">Login</Button>
            </Box>

            <Box sx={{ marginY: 5, marginX: 28 }}>
                <Button variant="contained">Create Account</Button>
            </Box>
        </Container>
    );
}

export default Login;