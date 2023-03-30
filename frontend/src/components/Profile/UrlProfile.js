/**
 * UploadImageProfile
 * 
 * The upload profile functionality allows you to save an image url to the database
 * which will be used as the image source for the user's profile.
 * 
 * Author: Alice Kuang
 * Since: 3/29/23
 */

import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import DefaultImage from '../../images/socialimage.jpg'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material';
import TextField from '@mui/material/TextField'
import img from '../../images/ku1.jpg'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { Button, Card } from '@mui/material';
import axios from 'axios'
import { AXIOS_HEADER } from '../../constants';

export default function UploadImage() {
  const [open, setOpen] = React.useState(false);
  const [post, setPost] = React.useState(null);
  const [data, setData] = useState({
    url: '',
  });

  const {
    url
  } = data;

  const MyCollection = [
    {
      label: "First Picture",
      img: img,
    },
  ];


  const [index, setActiveStep] = React.useState(0);
  const [file, setFile] = useState("Invalid Image Source");
  const [image, setImage] = useState("");

  const handleChange = (value, key) => {
    setData(prevState => ({ ...prevState, [key]: value, }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    console.log(data);
    saveUrl(data);
    setOpen(false);
  };

  // function saveUrl() {
  //   axios
  //     .post("http://localhost:3003/imageProfile2/" + localStorage.getItem('email'), data)
  //     .then((response) => {
  //       console.log(response.data);
  //       setPost(response.data);
  //     });
  // }

  const saveUrl = (db) => {
    axios({
      url: 'http://localhost:3003/imageProfile2/' + localStorage.getItem("email"),
      method: 'POST',
      headers: AXIOS_HEADER,
      data: db,
    }).then(() => {
      alert("Successfully updated");
      setData({
        url: '',
      })
      handleClose();
    }).catch((e) => {
      console.log(e);
    })
  }


  useEffect(() => {
    const fetchImage = async () => {

      // upload the photo
      await axios.get("http://localhost:3003/profileUrl/" + localStorage.getItem('email'))
        .then(res => {
          console.log(res.data[0].profile1);
          localStorage.setItem("profileUrl", res.data[0].profile1);
        })
        .catch(err => {
          console.log(err)
        })
    }
    fetchImage();
  }, []);

  return (
    <Grid container-spacing={2} alignItems="center" justifyContent="center" >
      <Grid item xs={10} sx={{ mx: 5 }}>
        <img
          //src="https://www.ediblearrangements.com/blog/wp-content/uploads/2021/11/Dahlia-min.jpg"
          src={localStorage.getItem("profileUrl") ? localStorage.getItem("profileUrl") : MyCollection[index].img}
          style={{
            height: 255,
            width: "100%",
            maxWidth: 400,
            display: "block",
            overflow: "hidden",
          }}
          alt={MyCollection[index].label}
          onError={() => setFile(DefaultImage)}
        />

      </Grid>
      <br />

      <Button variant="outlined" onClick={handleClickOpen}>
        <InsertPhotoIcon /> &nbsp; Upload Photo
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <br />
          Photo url:

          <br /> <br />
          {/* <Grid container spacing={2}
            //justifyContent="center"
            alignItems="center"
          > */}

          <Grid item xs={15} >
            <TextField
              id="url"
              label="https://myphoto.com"
              variant="outlined"
              onChange={e => handleChange(e.target.value, 'url')}
              value={url}
              fullWidth
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

{/*      <Button variant="contained" component="label"
        sx={{
          backgroundColor: "darkblue",
          fontFamily: "arial",
        }}
      > <UploadIcon sx={{fontSize: "medium" }} /> &nbsp; Upload
        <input hidden accept="image/*" 
                multiple type="file" 
                onChange={onSelectFile}/>
         </Button> 
*/}