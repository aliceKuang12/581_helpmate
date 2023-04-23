/**
 * CreateHealth.js 
 *
 * Form to create a new assignment for the health page. 
 * Allows users to dynamically update the events stored in the DBs.
 *
 * @link   URL
 * @file   This file defines the CreateAssign class.
 * @author Eva Morrison. Alice Kuang.
 * @since  3/11/23
 */

import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import axios from 'axios'
import { useAuth } from '../../context/AuthContext';
import { AXIOS_HEADER } from '../../constants';

export default function CreateHealth() {
  const [open, setOpen] = React.useState(false);
  const [post, setPost] = React.useState(null);
  const { currentUser } = useAuth();
  const user = JSON.parse(currentUser);
  const [data, setData] = useState({
    userId: user.id,
    title: '',
    category: '',
    date: '',
    time: '',
    location: '',
    completed: '0',
    notes: '',
  });

  const {
    userId,
    title,
    category,
    date,
    time,
    location,
    completed,
    notes,
  } = data;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setData({
      userId: user.id,
      title: '',
      category: '',
      date: '',
      time: '',
      location: '',
      completed: '0',
      notes: '',
    });
    setOpen(false);
  };

  const handleChange = (value, key) => {
    setData(prevState => ({...prevState, [key]: value,}));
  };

  const handleCreate = () => {
    console.log(data);
    createHealthPost();
    setOpen(false);
  };

  useEffect(() => {
    const fetchHealth = async () => {
        await axios.get("http://localhost:3003/healths/")
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }
    fetchHealth()
  }, []);

  function createHealthPost() {
    console.log("creating post")
    axios
      .post("http://localhost:3003/health/create", data)
      .then((response) => {
        setData({
          userId: user.id,
          title: '',
          category: '',
          date: '',
          time: '',
          location: '',
          completed: '0',
          notes: '',
        });
        console.log(response.data);
        setPost(response.data);
        window.location.reload()
      });
  }


  return (
    <div >
      <Button onClick={handleClickOpen} variant="outlined" sx={{backgroundColor: "cornsilk", fill: "blue", color:"Black" }}>
      <LibraryAddIcon sx={{fontSize: "large", color: "blue"}}/>
      </Button>

      
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
            <br/>
            <Typography  variant="h6" sx={{textAlign: 'center'}}>
            Create Event
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
            <Typography sx={{fontSize: 16, textAlign: 'left', padding: 2}}>
              Category:
            </Typography>
            </Grid>
            <Grid item xs={9.5}>    
              <TextField
                id="category"
                label="category"
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
                id="time"
                type="time"
                variant="outlined"
                onChange={e => handleChange(e.target.value, 'time')}
                value={time}
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
                Complete: 
               </Typography>
             </Grid> 
             <Grid item xs={4}>
              <TextField
                id="completed"
                label="'1' for yes, '0' for no"
                onChange={e => handleChange(e.target.value, 'completed')}
                fullWidth
                value={completed}
                rows={4}
              />
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
    