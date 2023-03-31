import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CreateIcon from '@mui/icons-material/Create';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField'
import { Typography } from '@mui/material';
import Checkbox from '../Checkbox';
import { useAuth } from '../../context/AuthContext';
import { AXIOS_HEADER } from '../../constants';

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
    time: '',
    completed: '0',
    address: '',
    notes: '',
    photo: '',
  });

  const {
    userId,
    title,
    category,
    date,
    time,
    completed,
    address,
    notes,
    photo
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

  const handleCreate = () => {
    createSocialPost();
  };

  const handleChange = (value, key) => {
    setData(prevState => ({...prevState, [key]: value,}));
  };

  function createSocialPost() {
    axios
      .post("http://localhost:3003/social/create", data)
      .then((response) => {
        setPost(response.data);
        handleClose();
        window.location.reload();
      }).catch((e) => {
        alert("An error has occured");
      });
  }

  const handleUpdate = async (e) => {
    handleData(data);
    setOpen(false);
}

// update route
const handleData = (db) => {
  axios({
    url: 'http://localhost:3003/academics/update/' + localStorage.getItem("email"),
    method: 'POST',
    headers: AXIOS_HEADER,
    data: db,
  }).then(() => {
    alert("Successfully updated, logout to see changes")
    setData({
      userId: user.id,
      title: '',
      category: '',
      eventTime: '',
      completed: '',
      location: '',
      notes: '',
    })
    handleClose();
  }).catch((e) => {
    console.log(e);
  })
}

  return (
    <div >
      <Button onClick={handleClickOpen} variant="outlined" sx={{backgroundColor: "cornsilk", fill: "blue", color:"Black" }}>
      <CreateIcon sx={{fontSize: "large", color: "green"}}/>
      </Button>

      
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
            <br/>
            <Typography sx={{textAlign: 'center'}}>
            Create Social  
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