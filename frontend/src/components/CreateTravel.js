import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CreateIcon from '@mui/icons-material/Create';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField'
import { Typography } from '@mui/material';
export default function BasicForm() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState({
    title: '',
    date: '',
    time: '',
    completed: '',
    address: '',
    notes: '',
    ticket: '',
  });

  const {
    title,
    date,
    time,
    completed,
    address,
    notes,
    ticket,
  } = data;


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (value, key) => {
    setData(prevState => ({...prevState, [key]: value,}));
  };

  return (
    <div >
      <Button onClick={handleClickOpen} variant="outlined" sx={{backgroundColor: "cornsilk", fill: "blue", color:"Black" }}>
      <CreateIcon sx={{fontSize: "large", color: "blue"}}/>
      </Button>

      
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
            <Grid container
            justifyContent="center"
            alignItems="center"
            direction="column"
            sx={{ minHeight: "100vh" }}
          >
            <Typography>
            Create Event Info 
            </Typography> <br/> <br/>
            <Grid item xs={12}>
              <TextField
                id="title"
                label="title"
                variant="outlined"
                onChange={e => handleChange(e.target.value, 'title')}
                value={title}
                fullWidth sx={{ marginBottom: '1rem' }}
              />
              <TextField
              id="date"
              label="mm/dd/yyyy"
              variant="outlined"
              onChange={e => handleChange(e.target.value, 'date')}
              value={date}
              />  &nbsp; &nbsp; &nbsp; 
            <TextField
                id="time"
                label="hh:mm"
                variant="outlined"
                onChange={e => handleChange(e.target.value, 'time')}
                value={time}
              /><br/><br/>
              <TextField
                id="address"
                label="address"
                variant="outlined"
                onChange={e => handleChange(e.target.value, 'address')}
                value={address}
                fullWidth sx={{ marginBottom: '1rem' }}
              />
              <TextField
                id="notes"
                label="notes"
                variant="outlined"
                onChange={e => handleChange(e.target.value, 'notes')}
                value={notes}
                fullWidth sx={{ marginBottom: '1rem' }}
              />
              add checkbox: completed
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Create</Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
}
//original button:  
// <Button onClick={handleClickOpen} sx={{fill: "blue", color:"Black" }}>
    