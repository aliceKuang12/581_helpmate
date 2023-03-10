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
import img from '../images/ku_building_1.jpg'


export default function UploadImage() {

// saving multiple urls: https://www.youtube.com/watch?v=PDtW-XAshqs
  const [ selectedImages, setSelectedImages ] = useState([]);
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
      img: img,
    },
  ];

  const CollectionSize = MyCollection.length;
  const theme = useTheme();
  const [index, setActiveStep] = React.useState(0);
 

  const [file, setFile] = useState("Invalid Image Source");
  // function saveUrl(e) {
  //     console.log(e.target.files);
  //     setFile(URL.createObjectURL(e.target.files[0]));
  // }
  return (
    <Grid container-spacing={2}  alignItems="center" justifyContent="center" >
        <Grid item xs={10} sx={{mx: 5}}>
           <img 
              src= {selectedImages[index] ? selectedImages[index] : MyCollection[index].img }
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
       <br/>
      <Button variant="contained" component="label"
      sx={{
        backgroundColor: "darkblue",
        fontFamily: "arial",
      }}
      >
      <UploadIcon sx={{fontSize: "medium" }} /> &nbsp; Upload
        <input hidden accept="image/*" 
                multiple type="file" 
                onChange={onSelectFile}/>
      </Button>
      
    </Grid>
  );
}