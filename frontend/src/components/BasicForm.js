import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SignUp from './SignUp';
import Stack from '@mui/material/Stack';
import { Grid, Typography } from '@mui/material';

export default function BasicForm() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div >
      <Button variant="outlined" onClick={handleClickOpen}  sx={{fill: "blue", color:"navy"}}>
        Create Account
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
        <SignUp />
          <br />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Sign Up</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
