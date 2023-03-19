import React, { useState } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import UploadIcon from '@mui/icons-material/Upload';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import DefaultImage from '../images/socialimage.jpg'
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import img1 from '../images/rollar_coaster.jpg'
import img2 from '../images/socialimage.jpg'
import img3 from '../images/hiker.jpg'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from 'axios';

export default function UploadImage() {

  // saving multiple urls: https://www.youtube.com/watch?v=PDtW-XAshqs
  const [selectedImages, setSelectedImages] = useState([]);
  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles)

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages(imagesArray);
  }

  // const onSelectFile = (files) => {
  //   // Update chosen files
  //   setSelectedImages([ ...files ])
  // };

  const onSubmit = (e) => {
    // Create a form and post it to server
    e.preventDefault()
    let formData = new FormData()
    selectedImages.forEach((file) => formData.append("files", file))

    // axios send form data ref: https://stackoverflow.com/questions/47630163/axios-post-request-to-send-form-data
    axios({
      url: "http://localhost:3003/imageSocial/" + localStorage.getItem("email"),
      method: "POST",
      body: formData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then(function (response) {
      //handle success
      console.log(response);
    })
    .catch(function (err) {
      //handle error
      console.log(err);
    });
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
          onError={() => setFile(DefaultImage)}
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
      <br />
      <Grid>

        <form onSubmit = {onSubmit}   
          sx={{ textAlign: 'center' }}>
          <input type="file" name="social" onChange={onSelectFile} multiple /><br/>
          <input type="submit" value="submit"/>
        </form>

        {/* <Button variant="outlined" component="label"
          sx={{
            // backgroundColor: "darkgreen",
            fontFamily: "arial",
          }}
        >
          <AddPhotoAlternateIcon sx={{ fontSize: "medium" }} />
          <input hidden accept="image/*"
              multiple type="file"
              onChange={onSelectFile}

            />
        </Button> */}
      </Grid>
      <br />
    </Grid>
  );
}


