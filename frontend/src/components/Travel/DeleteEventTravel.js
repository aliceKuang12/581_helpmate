/**
 * DeleteEventTravel.js 
 *
 * Form to delete an existing travel event for the travel page. 
 * Allows users to dynamically update the events stored in the DBs.
 *
 * @link   URL
 * @file   This file defines the DeleteEventTravel class.
 * @author Eva Morrison. Alice Kuang.
 * @since  3/25/23
 */

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DeleteIcon from '@mui/icons-material/Delete';

import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import axios from 'axios';
import {useEffect, useState} from 'react';

import { useAuth } from '../../context/AuthContext';

export default function BasicForm() {
  const [open, setOpen] = React.useState(false);
  const [post, setPost] = React.useState(null);

  const { currentUser } = useAuth();
  const user = JSON.parse(currentUser);

  const [data, setData] = useState({
    userId: user.id,
    title: '',
    category: '',
    date: '',
    eventTime: '',
  });

  const {
    userID,
    title,
    category,
    date,
    eventTime,
  } = data;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    console.log(data);
    DeleteTravelEvent();
    setOpen(false);
    window.location.reload();
  };

  const handleChange = (value, key) => {
    setData(prevState => ({...prevState, [key]: value,}));
  };

  useEffect(() => {
    const fetchTravel = async () => {
        await axios.get("http://localhost:3003/travel/"+ localStorage.getItem("email"))
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }
    fetchTravel()
  }, []);

  function DeleteTravelEvent() {
    console.log("deleting event")
    console.log(data);
    axios
      .delete("http://localhost:3003/travel/delete", { data: { data } })
      .then((response) => {
        console.log(response.data);
        setPost(response.data);
      });
  }

  return (
    <div >
      <Button onClick={handleClickOpen} variant="outlined" sx={{backgroundColor: "cornsilk", fill: "blue", color:"Black", }}>
      <DeleteIcon sx={{fontSize: "large", color: "blue"}}/>
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
            <br/>
            <Typography sx={{textAlign: 'center'}}>
              Delete Event  
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
            Category:
            </Typography>  
            </Grid>
            <Grid item xs={9.5}>
              <TextField
                id="title"
                label="event category"
                variant="outlined"
                onChange={e => handleChange(e.target.value, 'category')}
                value={category}
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
                id="eventTime"
                type="time"
                variant="outlined"
                onChange={e => handleChange(e.target.value, 'eventTime')}
                value={eventTime}
                fullWidth
              />
            </Grid> 
            
            </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
}