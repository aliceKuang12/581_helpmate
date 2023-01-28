import React, {useState} from 'react';
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
import img1 from '../images/socialimage.jpg'
import img2 from '../images/socialUploadTest.jpg'
import img3 from '../images/hiker.jpg'



export default function UploadImage() {

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
  function saveUrl(e) {
      console.log(e.target.files);
      setFile(URL.createObjectURL(e.target.files[0]));
  }
  return (
    <Grid container-spacing={2}  alignItems="center" justifyContent="center" >
        <Grid item xs={10} sx={{mx: 5}}>
           <img 
              src={MyCollection[index].img}
              style={{
                height: 255,
                width: "100%",
                maxWidth: 400,
                display: "block",
                overflow: "hidden",
              }}
              alt={MyCollection[index].label} 
           onError = {() => setFile(DefaultImage)}
           />
        </Grid>
    <br/>
    <MobileStepper
          variant="text"
          position="static"
          index={index}
          steps={CollectionSize}
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
              disabled={index === CollectionSize - 1}
            >
              {theme.direction !== "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
            </Button>
          }
        />
       <br/>
      <Button variant="contained" component="label"
      sx={{
        backgroundColor: "darkgreen",
        fontFamily: "arial",
      }}
      >
      <UploadIcon sx={{fontSize: "medium" }} /> &nbsp; Upload
        <input hidden accept="image/*" 
                multiple type="file" 
                onChange={saveUrl}/>
      </Button>
      
    </Grid>
  );
}
