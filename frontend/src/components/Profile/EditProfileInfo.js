import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CreateIcon from '@mui/icons-material/Create';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField'
import Checkbox from '../Checkbox';
import { AXIOS_HEADER } from '../../constants';
import { Typography } from '@mui/material';
import axios from 'axios'

export default function BasicForm() {
  const [open, setOpen] = React.useState(false);
  const user = localStorage.getItem("user");
  const [data, setData] = useState({
    //id: localStorage.getItem("id"),
    fname: user.fname,
    lname: '',
    username: '',
    email: '',
    cell: '',
    address: '',
    birthday: '',
  });

  const {
   // id,
    fname,
    lname,
    username,
    email,
    cell,
    address,
    birthday,
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

  const handleChange = (value, key) => {
    setData(prevState => ({ ...prevState, [key]: value, }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      handleData(data);
    } catch (e) {
      alert(e)
    }
  }

  const handleData = (db) => {
    axios({
      url: 'http://localhost:3003/profile/' + localStorage.getItem("email"),
      method: 'POST',
      headers: AXIOS_HEADER,
      data: db,
    }).then(() => {
      alert("Successfully updated, logout to see changes")
      setData({
        fname: '',
        lname: '',
        username: '',
        email: '',
        phone: '',
        address: '',
        birthday: ''
      })
      handleClose();
    }).catch((e) => {
      console.log(e);
    })
  }

  return (
    <div >
      <Button onClick={handleClickOpen} variant="outlined" sx={{ backgroundColor: "cornsilk", fill: "blue", color: "Black" }}>
        <CreateIcon sx={{ fontSize: "large", color: "darkblue" }} />
      </Button>


      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <br />
          <Typography sx={{ textAlign: 'center' }}>
            Update Personal Information
          </Typography>
          <br />
          <Grid container spacing={2}
            //justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={2}>
              <Typography sx={{ fontSize: 16, textAlign: 'left', marginY: 1, padding: 2 }}>
                Name:
              </Typography>
            </Grid>
            <Grid item xs={4.5}>
              <TextField
                id="fname"
                label="first"
                variant="outlined"
                onChange={e => handleChange(e.target.value, 'fname')}
                value={fname}
                fullWidth
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                id="lname"
                label="last"
                variant="outlined"
                onChange={e => handleChange(e.target.value, 'lname')}
                value={lname}
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ fontSize: 16, textAlign: 'left', marginY: 1, padding: 2 }}>
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
              <Typography sx={{ fontSize: 16, textAlign: 'left', padding: 2 }}>
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
              <Typography sx={{ fontSize: 16, textAlign: 'left', marginY: 1, padding: 2 }}>
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
              <Typography sx={{ fontSize: 16, textAlign: 'left', marginY: 1, padding: 2 }}>
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
              <Typography sx={{ fontSize: 16, textAlign: 'left', marginY: 1, padding: 2 }}>
                Birthday:
              </Typography>
            </Grid>
            <Grid item xs={9.5}>
              <TextField
                id="birthday"
                label="YYYY-MM-DD"
                onChange={e => handleChange(e.target.value, 'birthday')}
                multiline
                fullWidth
                value={birthday}
                required
              />
            </Grid>

          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}