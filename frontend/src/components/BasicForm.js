import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import SignUp from './SignUp';

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
