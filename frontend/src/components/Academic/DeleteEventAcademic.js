/**
 * Author: Eva Morrison, Alice Kuang
 * Created: 3/25/23
 * Update Date: 3/25/23
 * Description: Delete academic component. Handles collecting user information through 
 * a form to delete from the users stored events in backend database
 * 
 */

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DeleteIcon from '@mui/icons-material/Delete';
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
      <Button onClick={handleClickOpen} variant="outlined" sx={{backgroundColor: "cornsilk", fill: "blue", color:"Black", }}>
      <DeleteIcon sx={{fontSize: "large", color: "red"}}/>
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
            Delete any event on page, future sprint
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
}