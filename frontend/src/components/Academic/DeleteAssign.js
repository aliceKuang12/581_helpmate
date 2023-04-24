/**
 * Author: Eva Morrison, Alice Kuang
 * Created: 3/25/23
 * Update Date: 4/09/23
 * Description: Delete academic component. Handles collecting user information through 
 * a form to delete from the users stored events in backend database
 * 
 */

import * as React from 'react';
import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DeleteIcon from '@mui/icons-material/Delete';

import { useAuth } from '../../context/AuthContext';

import axios from 'axios';

import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

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
    deleteAcademicEvent();
    setOpen(false);
    window.location.reload();
  }

  const handleChange = (value, key) => {
    setData(prevState => ({...prevState, [key]: value,}));
  };

  useEffect(() => {
    const fetchAcademic = async () => {
        await axios.get("http://localhost:3003/academics/"+ localStorage.getItem("email"))
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }
    fetchAcademic()
  }, []);

  function deleteAcademicEvent() {
    console.log("deleting event")
    console.log(data);
    axios
      .delete("http://localhost:3003/academics/delete", { data: { data } })
      .then((response) => {
        console.log(response.data);
        setPost(response.data);
      });
  }

  return (
    <div >
      <Button onClick={handleClickOpen} variant="outlined" sx={{backgroundColor: "cornsilk", fill: "blue", color:"Black", }}>
      <DeleteIcon sx={{fontSize: "large", color: "red"}}/>
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