import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles';
import UploadImage from "./UploadSocialUrls"

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'transparent',
    padding: theme.spacing(1),
}));

const ModuleCard = () => {

    return (
        <Grid item xs={6} marginBottom={5}>
            <Paper sx={{ opacity: .9, backgroundColor: 'orange' }}>
                <Box
                    paddingX={6} 
                    paddingY={3}
                    sx={{
                        display: "flex",
                        alignItems: "left",
                        height: 500,
                        backgroundColor: 'orange',
                        
                    }}
                >
                    <Stack spacing={2}
                        justifyContent="center"
                        sx={{ height: '100%', width: '100%' }}>
                        <br/>
                        <Typography
                            varient='h4'
                            component='h2'
                            sx={{ fontWeight: 'bold', textAlign: 'center', fontSize: 20, fontFamily: 'cursive' }}
                        >
                            Pictures
                        </Typography>
                        <br/>
                        <Item elevation={0}>
                            <Stack
                                
                                direction="row"
                                justifyContent="center"
                                sx={{
                                    height: '100%',
                                    width: '100%',
                                    textAlign: 'center',
                                    paddingY: "2px"
                                }}
                            >
                                <UploadImage />
                                <br />
                            </Stack>
                        </Item>
                    <br />
                    <br />
                    </Stack>
                </Box>
            </Paper>
        </Grid>)
}

export default ModuleCard