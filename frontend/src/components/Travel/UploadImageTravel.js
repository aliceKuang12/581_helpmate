/**
 * UploadImage.js 
 *
 * Functionality to Upload 3 Images for Travel Module
 *
 * @link   URL
 * @file   
 * @author Brooke Jackson, Alice Kuang
 * @since  2/26/23
 */


import React, { useState } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import UploadIcon from '@mui/icons-material/Upload';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import img1 from '../../images/ku1.jpg'
import img2 from '../../images/ku2.jpg'
import img3 from '../../images/ku3.jpg'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

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


  // set default images
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

  // setup mobile stepper for slideshow of photos
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
      <br />
      <Grid>
      <form // onSubmit = {onSubmit}   
          action={"http://localhost:3003/imageTravel/" + localStorage.getItem("email")}
          encType="multipart/form-data"
          method="POST"
          sx={{ textAlign: 'center' }}>
          <input type="file" name="_travel" multiple onChange={onSelectFile}/><br />
          <input type="submit" value="submit" />
        </form>
        {/* <Button variant="outlined" component="label"
          sx={{
            fontFamily: "arial",
          }}
        >
          <AddPhotoAlternateIcon sx={{ fontSize: "medium" }} />

          <input hidden accept="image/*"
            multiple type="file"
            onChange={onSelectFile} />
        </Button> */}
      </Grid>
      <br/>
    </Grid>
  );
}
