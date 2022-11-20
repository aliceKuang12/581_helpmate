import * as React from 'react';
import Button from '@mui/material/Button';

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
      <SignUp
        isOpen={open}
        handleClose={handleClose}
      />
    </div>
  );
}
