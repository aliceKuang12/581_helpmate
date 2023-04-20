/**
 * UploadTravelUrl.js
 * 
 * Get travel photo urls from database (not yet implemented) and send 3 travel photo urls
 * to the backend database. 
 * 
 * Author: Alice Kuang
 * Since: 4/20/23
 */

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MobileStepper from "@material-ui/core/MobileStepper";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { useTheme } from "@material-ui/core/styles";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import img1 from '../../images/rollar_coaster.jpg'
import img2 from '../../images/socialimage.jpg'
import img3 from '../../images/hiker.jpg'
import TextField from '@mui/material/TextField'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import axios from 'axios'
import { AXIOS_HEADER } from '../../constants';

export default function UploadImage() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState({
    user_id: localStorage.getItem("userId"),
    soc1: '',
    soc2: '',
    soc3: ''
  });

  const {
    user_id,
    soc1,
    soc2,
    soc3
  } = data;

  const handleChange = (value, key) => {
    setData(prevState => ({ ...prevState, [key]: value, }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function refreshPage() {
    window.location.reload(false);
  }

  const handleSave = async (e) => {
    console.log(data);
    saveUrl(data);
    setOpen(false);
    refreshPage();
  };

  const saveUrl = (db) => {
    axios({
      url: 'http://localhost:3003/saveTravels',
      method: 'POST',
      headers: AXIOS_HEADER,
      data: db,
    }).then(() => {
      setData({
        user_id: localStorage.getItem("userId"),
        soc1: '',
        soc2: '',
        soc3: ''
      })
      handleClose();
    }).catch((e) => {
      console.log(e);
    })
  }



  const MyCollection = [
    {
      label: "First Picture",
      img: img1,
    },
    {
      label: "Second Picture",
      img: img2,
    },
    {
      label: "Third Picture",
      img: img3,
    },
  ];

  const CollectionSize = MyCollection.length;
  const theme = useTheme();
  const [index, setActiveStep] = React.useState(0);

  const goToNextPicture = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const goToPrevPicture = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [file, setFile] = useState("Invalid Image Source");

  return (

    <Grid container-spacing={2} alignItems="center" justifyContent="center" >
      <Grid item xs={10} sx={{ mx: 5 }}>
        <br />
        <img
          src={selectedImages[index] ? selectedImages[index] : MyCollection[index].img}
          style={{
            height: 255,
            width: "100%",
            maxWidth: 400,
            display: "block",
            overflow: "hidden",

          }}
          alt={MyCollection[index].label}
          onError={() => setFile(img2)}
        />
      </Grid>
      <br />
      <MobileStepper
        variant="text"
        position="static"
        index={index}
        steps={CollectionSize}
        activeStep={index}
        backButton={
          <Button
            size="small"
            onClick={goToPrevPicture}
            disabled={index === 0}
          >
            {theme.direction !== "ltr" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </Button>
        }
        nextButton={
          <Button
            size="small"
            onClick={goToNextPicture}
            disabled={index === 2}
          >
            {theme.direction !== "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </Button>
        }
      />
      <Grid>
      <Button onClick={handleClickOpen}>
        <InsertPhotoIcon /> &nbsp; Change photo
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <br />
          Photo urls:
          <br /> <br />

          {/* form to send url of photo with */}
          <Grid item xs={15} >
            <TextField
              id="url"
              label="https://myphoto.com"
              variant="outlined"
              onChange={e => handleChange(e.target.value, 'soc1')}
              value={soc1}
              fullWidth
            />
          </Grid>
          <br/>
           <Grid item xs={15} >
            <TextField
              id="url"
              label="https://myphoto.com"
              variant="outlined"
              onChange={e => handleChange(e.target.value, 'soc2')}
              value={soc2}
              fullWidth
            />
          </Grid>
          <br/>
          <Grid item xs={15} >
            <TextField
              id="url"
              label="https://myphoto.com"
              variant="outlined"
              onChange={e => handleChange(e.target.value, 'soc3')}
              value={soc3}
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
      <br />
    </Grid>
  );
}

/* onChange={onSelectFile} */
