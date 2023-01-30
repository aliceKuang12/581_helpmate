import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
export default function BasicForm() {
  const [open, setOpen] = React.useState(false);

  const openCalendar = () => {
    const url = "https://calendar.google.com/calendar/u/0/r";
    window.open(url, '_blank', 'noopener,noreferrer');
   // setOpen(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div >
      <Button onClick={openCalendar} sx={{ fill: "blue", color:"Black" }}>
        View Events
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
            Calender
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
}