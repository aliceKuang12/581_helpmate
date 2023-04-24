/**
 * TravelCard2.js 
 *
 * Display the user's travel related photo. Could include pictures of plane or bus tickets.
 * @link   URL
 * @file   This file defines the DeleteEventTravel class.
 * @author Eva Morrison. Alice Kuang.
 * @since  3/25/23
 */

import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles';
import UploadImage from "./UploadTravelUrls"

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'transparent',
    // padding: theme.spacing(1),
  }));

const ModuleCard = (  ) => {

    return (
    <Grid item xs={6} marginBottom = {5}>
        <Paper sx = {{opacity:.9}}>
            <Box 
                paddingX={4}
                sx={{
                    display: "flex",
                    alignItems: "left",
                    height: 500,
                    backgroundColor: 'lightblue',
                    borderRadius: 1,
                }}
            >
            <Stack spacing={2} 
                   justifyContent="center" 
                   sx={{height: '100%', width: '100%'}}>
                    <Typography 
                        varient='h4' 
                        component='h2' 
                        sx={{fontWeight: 'bold', textAlign: 'center', fontSize: 20, fontFamily: 'cursive'}}
                    >
                    Travel Information
                    </Typography>
                <Item elevation={0}>             
                <UploadImage/>
                </Item>
                <br/>
            </Stack>
            </Box>
        </Paper>
    </Grid>)
}

export default ModuleCard
//<Item elevation={10} sx={{width: '25%',background:'white'}}>