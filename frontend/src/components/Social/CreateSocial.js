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