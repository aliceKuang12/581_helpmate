import React, {useState} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CreateIcon from '@mui/icons-material/Create';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField'
import Checkbox from './Checkbox';
import { Typography } from '@mui/material';
import { AXIOS_HEADER } from '../constants';
import { useAuth } from '../context/AuthContext';

export default function BasicForm() {
  const { currentUser } = useAuth();
  const [open, setOpen] = React.useState(false);
  const user = JSON.parse(currentUser);
  const currentData = {
    id: user.id,
    fname: user.fname,
    lname: user.lname,
    username: user.username,
    email: user.email,
    cell: user.cell,
    address: user.address,
    birthday: user.birthday,
  }
  const [data, setData] = useState(currentData);
 
  const {
    id,
    fname,
    lname,
    username,
    email,
    cell,
    address,
    birthday,
    password,
  } = data;
  const [file, setFile] = useState();
  function saveUrl(e) {
      console.log(e.target.files);
      setFile(URL.createObjectURL(e.target.files[0]));
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setData(currentData);
  };

  const handleUpdateProfile = () => {
    axios({
      url: "http://localhost:3003/user",
      method: "PUT",
      header: AXIOS_HEADER,
      data: data
    }).then((res) => {
      if (res.status === 200) {
        setOpen(false);
        localStorage.setItem("user", JSON.stringify(data));
        window.location.reload(true);
      } else {
        throw new Error("Error updating profile")
      }
      setData(currentData);
    }).catch((err) => {
      alert(err.message);
    })
  }

  const handleChange = (value, key) => {
    setData(prevState => ({...prevState, [key]: value,}));
  };

  return (
    <div >
      <Button onClick={handleClickOpen} variant="outlined" sx={{backgroundColor: "cornsilk", fill: "blue", color:"Black" }}>
      <CreateIcon sx={{fontSize: "large", color: "darkblue"}}/>
      </Button>

      
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
            <br/>
            <Typography sx={{textAlign: 'center'}}>
            Edit Personal Information  
            </Typography> 
            <br/> 
          <Grid container  spacing={2}
            //justifyContent="center"
            alignItems="center"
          >  
            <Grid item xs={2}>
            <Typography sx={{fontSize: 16, textAlign: 'left', marginY: 1, padding: 2}}>
              Name:
            </Typography>  
            </Grid>
            <Grid item xs={9.5}>
              <TextField
                id="fname"
                label="First name"
                variant="outlined"
                onChange={e => handleChange(e.target.value, 'fname')}
                value={fname}
                fullWidth
              />
              <TextField
                id="lname"
                label="Last name"
                variant="outlined"
                onChange={e => handleChange(e.target.value, 'lname')}
                value={lname}
                fullWidth
              /> 
            </Grid>
              
            <Grid item xs={2}>
            <Typography sx={{fontSize: 14, textAlign: 'left', marginY: 1, padding: 2}}>
              Username:
            </Typography>
            </Grid>
            <Grid item xs={9.5}>
              <TextField
              id="username"
              label="username"
              type="username"
              variant="outlined"
              onChange={e => handleChange(e.target.value, 'username')}
              value={username}
              fullWidth
              />  
            </Grid>

            <Grid item xs={2}>
                <Typography sx={{fontSize: 16, textAlign: 'left', marginY: 1, padding: 2}}>
                  Password: 
               </Typography>
             </Grid> 
             <Grid item xs={9.5}>
              <TextField
                  id="password"
                  label="password"
                  onChange={e => handleChange(e.target.value, 'password')}
                  multiline
                  fullWidth
                  value={cell}
              />
            </Grid>

            <Grid item xs={2}>
            <Typography sx={{fontSize: 16, textAlign: 'left', padding: 2}}>
              Email:
            </Typography>
            </Grid>
            <Grid item xs={9.5}>    
              <TextField
                id="email"
                label="email"
                variant="outlined"
                onChange={e => handleChange(e.target.value, 'email')}
                value={email}
                fullWidth 
              />
            </Grid>
            
             <Grid item xs={2}>
                <Typography sx={{fontSize: 16, textAlign: 'left', marginY: 1, padding: 2}}>
                  Cell: 
               </Typography>
             </Grid> 
             <Grid item xs={9.5}>
              <TextField
                  id="cell"
                  label="cell number"
                  onChange={e => handleChange(e.target.value, 'cell')}
                  multiline
                  fullWidth
                  value={cell}
              />
            </Grid>

            <Grid item xs={2}>
                <Typography sx={{fontSize: 16, textAlign: 'left', marginY: 1, padding: 2}}>
                  Address: 
               </Typography>
             </Grid> 
             <Grid item xs={9.5}>
              <TextField
                  id="address"
                  label="address"
                  onChange={e => handleChange(e.target.value, 'address')}
                  multiline
                  fullWidth
                  value={address}
              />
            </Grid>

            <Grid item xs={2}>
                <Typography sx={{fontSize: 16, textAlign: 'left', marginY: 1, padding: 2}}>
                  Birthday: 
               </Typography>
             </Grid> 
             <Grid item xs={9.5}>
              <TextField
                  id="birthday"
                  label="birthday"
                  onChange={e => handleChange(e.target.value, 'birthday')}
                  multiline
                  fullWidth
                  value={birthday}
              />
            </Grid>

            </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleUpdateProfile}>Save</Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
}