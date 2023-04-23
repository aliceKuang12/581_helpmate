/**
 * UploadImageSocial
 * 
 * Note: defunct since 4/20. Currently using UploadSocialUrls to save photos. 
 * 
 * Show slideshow of 3 default photos. Allow user to upload 3 photos from local computer and store 
 * images to upload folder in backend, and file location to database.
 * 
 * Author: Brooke Jackson, Alice Kuang
 * Since: 2/26/23
 */

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
// import DefaultImage from '../../images/socialimage.jpg'
import MobileStepper from "@material-ui/core/MobileStepper";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { useTheme } from "@material-ui/core/styles";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import img1 from '../../images/rollar_coaster.jpg'
import img2 from '../../images/socialimage.jpg'
import img3 from '../../images/hiker.jpg'

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
        <form // onSubmit = {onSubmit}   
          action={"http://localhost:3003/imageSocial/" + localStorage.getItem("email")}
          encType="multipart/form-data"
          method="POST"
          sx={{ textAlign: 'center' }}>
          <input type="file" name="_social" multiple onChange={onSelectFile}/><br />
          <input type="submit" value="submit" />
        </form>

      </Grid>
      <br />
    </Grid>
  );
}

/* onChange={onSelectFile} */
