import React, {useState} from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import UploadIcon from '@mui/icons-material/Upload';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Ticket from '../images/ticket.jpg'

export default function UploadImage() {
  const [file, setFile] = useState("Invalid Image Source");
  function saveUrl(e) {
      console.log(e.target.files);
      setFile(URL.createObjectURL(e.target.files[0]));
  }
  return (
    <Grid container-spacing={2}  alignItems="center" justifyContent="center" >
        <Grid item xs={10} sx={{mx: 5}}>
           <img src={file} width="300" height="350" 
           onError = {() => setFile(Ticket)}
           />
        </Grid>
    <br/>
    <Stack direction="row" alignItems="center" spacing={2}>
      <Button variant="contained" component="label"
      sx={{
        backgroundColor: "navy",
        fontFamily: "arial",
        marginLeft: 15
      }}
      >
      <UploadIcon sx={{fontSize: "medium" }} /> &nbsp; Upload
        <input hidden accept="image/*" 
                multiple type="file" 
                onChange={saveUrl}/>
      </Button>
    </Stack>
    </Grid>
  );
}
