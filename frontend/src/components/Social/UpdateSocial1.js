import React, {useState} from 'react';
import axios from 'axios'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CreateIcon from '@mui/icons-material/Create';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField'
import { Typography } from '@mui/material';
import { AXIOS_HEADER } from '../../constants';
import { useAuth } from '../../context/AuthContext';

export default function BasicForm() {
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = useState();
  const { currentUser } = useAuth();
  const user = JSON.parse(currentUser);
  const [data, setData] = useState({
    userId: user.id,
    title: '',
    category: '',
    eventTime: '',
    // time: '',
    completed: '0',
    location: '',
    notes: '',
  });

  const {
    userId,
    title,
    category,  
    eventTime,
    // time,    
    completed,
    location,
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
      eventTime: '',
     // time: '',
      location: '',
      completed: '0',
      notes: '',
    });
    setOpen(false);
  };

  
  const handleChange = (value, key) => {
    setData(prevState => ({...prevState, [key]: value,}));
  };
  
  const handleUpdate = async (e) => {
      handleData(data);
      setOpen(false);
      window.location.reload();
  }

  // update route
  const handleData = (db) => {
    axios({
      url: 'http://localhost:3003/social/update/',
      method: 'PUT',
      headers: AXIOS_HEADER,
      data: db,
    }).then(() => {
      console.log(db);
      setData({
        userId: user.id,
        title: '',
        category: '',
        // date: '',
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
      <CreateIcon sx={{fontSize: "large", color: "darkorange"}}/>
      </Button>

      
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
            <br/>
            <Typography variant="h6" sx={{textAlign: 'center'}}>
            Update Event   
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
                required
              /> 
            </Grid>
            <Grid item xs={2}>
            <Typography sx={{fontSize: 16, textAlign: 'left', marginY: 1, padding: 2}}>
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
              onChange={e => handleChange(e.target.value, 'eventTime')}
              value={eventTime}
              fullWidth
              />  
            </Grid>
            <Grid item xs={4.5}>
            {/* <TextField
                id="time"
                type="time"
                variant="outlined"
                onChange={e => handleChange(e.target.value, 'time')}
                value={time}
                fullWidth
              /> */}
            </Grid> 
 
            
            <Grid item xs={2}>
            <Typography sx={{fontSize: 16, textAlign: 'left', padding: 2}}>
              Location:
            </Typography>
            </Grid>
            <Grid item xs={9.5}>    
              <TextField
                id="location"
                label="text"
                variant="outlined"
                onChange={e => handleChange(e.target.value, 'location')}
                value={location}
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
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
}