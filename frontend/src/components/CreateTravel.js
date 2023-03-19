/**
 * CreateTravel.js 
 *
 * Form to create a new travel event for the travel page. 
 * Allows users to dynamically update the events stored in the DBs.
 *
 * @link   URL
 * @file   This file defines the CreateTravel class.
 * @author Eva Morrison. Alice Kuang.
 * @since  2/26/23
 */

import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CreateIcon from '@mui/icons-material/Create';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField'
import Checkbox from './Checkbox';
import { Typography } from '@mui/material';
import  axios from 'axios';
export default function BasicForm() {
  const [open, setOpen] = React.useState(false);
  const [post, setPost] = React.useState(null);
  const [data, setData] = useState({
    userId: '17',
    title: '',
    date: '',
    time: '',
    completed: '0',
    address: '',
    notes: '',
    ticket: '',
  });

  const {
    userId,
    title,
    date,
    time,
    completed,
    address,
    notes,
    ticket,
  } = data;
  const [file, setFile] = useState();
  function saveUrl(e) {
      console.log(e.target.files);
      setFile(URL.createObjectURL(e.target.files[0]));
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    console.log(data);
    createTravelPost();
    setOpen(false);
  };

  const handleChange = (value, key) => {
    //update the data to be the user's input
    setData(prevState => ({...prevState, [key]: value,}));
    //console.log(value);
    axios.get('http://localhost:3003/calendar')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
  };

  /**
 * Tutorial from: https://www.freecodecamp.org/news/how-to-use-axios-with-react/#how-to-make-a-post-request
 * useEffect hook to connect with the travel database
 * prints all travel information to the console
 */
  useEffect(() => {
    const fetchTravel = async () => {
        await axios.get("http://localhost:3003/travel/")
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }
    fetchTravel()
  }, []);

  /**
 * Tutorial from: https://www.freecodecamp.org/news/how-to-use-axios-with-react/#how-to-make-a-post-request
 * function: createTravelPost
 * uses axios post to take the user form data and post to local database
 */
  function createTravelPost() {
    console.log("creating post")
    axios
      .post("http://localhost:3003/travel/create", data)
      .then((response) => {
        console.log(response.data);
        setPost(response.data);
      });
  }

  return (
    <div >
      <Button onClick={handleClickOpen} variant="outlined" sx={{backgroundColor: "cornsilk", fill: "blue", color:"Black" }}>
      <CreateIcon sx={{fontSize: "large", color: "blue"}}/>
      </Button>

      
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
            <br/>
            <Typography sx={{textAlign: 'center'}}>
            Create Travel  
            </Typography> 
            <br/> 
          <Grid container  spacing={2}
            //justifyContent="center"
            alignItems="center"
          >  
            <Grid item xs={2}>
            <Typography sx={{fontSize: 16, textAlign: 'left', marginY: 1, padding: 2}}>
              Title:
            </Typography>  
            </Grid>
            <Grid item xs={9.5}>
              <TextField
                id="title"
                label="event title"
                variant="outlined"
                onChange={e => handleChange(e.target.value, 'title')}
                value={title}
                fullWidth
              /> 
            </Grid>
              
            <Grid item xs={2}>
            <Typography sx={{fontSize: 16, textAlign: 'left', marginY: 1, padding: 2}}>
              Date:
            </Typography>
            </Grid>
            <Grid item xs={5}>
              <TextField
              id="date"
              type="date"
              variant="outlined"
              onChange={e => handleChange(e.target.value, 'date')}
              value={date}
              fullWidth
              />  
            </Grid>
            <Grid item xs={4.5}>
            <TextField
                id="time"
                type="time"
                variant="outlined"
                onChange={e => handleChange(e.target.value, 'time')}
                value={time}
                fullWidth
              />
            </Grid> 
            
            <Grid item xs={2}>
            <Typography sx={{fontSize: 16, textAlign: 'left', padding: 2}}>
              Address:
            </Typography>
            </Grid>
            <Grid item xs={9.5}>    
              <TextField
                id="address"
                label="street address, city, state, zip"
                variant="outlined"
                onChange={e => handleChange(e.target.value, 'address')}
                value={address}
                fullWidth 
              />
            </Grid>
            
             <Grid item xs={2}>
                <Typography sx={{fontSize: 16, textAlign: 'left', marginY: 1, padding: 2}}>
                  Notes: 
               </Typography>
             </Grid> 
             <Grid item xs={9.5}>
              <TextField
                  id="notes"
                  label="text"
                  onChange={e => handleChange(e.target.value, 'notes')}
                  multiline
                  fullWidth
                  value={notes}
                  rows={4}
              />
            </Grid>
            
            <Grid item xs={2}>
                <Typography sx={{fontSize: 16, textAlign: 'left', marginY: 1, padding: 2}}>
                  Files: 
               </Typography>
             </Grid> 
            <Grid item xs={4}>
            <Button variant="contained" component="label">
               Upload
              <input hidden accept="image/*" multiple type="file" onChange={saveUrl} />
              
            </Button>
            </Grid>

            <Grid item xs={2}>
               <Typography sx={{fontSize: 16, textAlign: 'left', marginY: 1, padding: 2}}>
                Complete: 
               </Typography>
             </Grid> 
             <Grid item xs={4}>
                <Checkbox/>        
             </Grid>
             <Grid item xs={2}/>
             <Grid item xs={2}><img src={file} width="40" height="40"/>
            </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
}
//original button:  
// <Button onClick={handleClickOpen} sx={{fill: "blue", color:"Black" }}>
    