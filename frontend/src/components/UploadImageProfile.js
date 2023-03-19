import React, { useState, useEffect } from 'react';
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
import axios from 'axios'

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
      img: img,
    },
  ];

  const [index, setActiveStep] = React.useState(0);
  const [file, setFile] = useState("Invalid Image Source");
  const [image, setImage] = useState("Invalid Image Source");

  const file1 ="";
  useEffect(() => {
    const fetchImage = async () => {
      const promise1 = await axios.get("http://localhost:3003/imageRefs/" + localStorage.getItem('email'))
        .then(res => {
          const data = res.data;
          file1 = data.map(d => setFile(d.profile1));
          console.log(res.data);
        })
        .catch(err => {
          console.log(err)
        });

      // display image with axios: https://stackoverflow.com/questions/69400766/get-image-through-axios-how-to-display-on-my-react-project
      const url = "http://localhost:3003/static/" + file1;
      const url2 = "http://localhost:3003/static/1679237795020.jpg"
      const promise2 = await axios.get(url, {
        responseType: "arraybuffer"
        })
        .then(res => { 
          const base64 = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          )
          setImage(base64)
          console.log('success');
        })
        .catch(err => {
          console.log(err)
        });

      Promise.all([promise1, promise2]).then(function (values) {
        console.log(values);

      });
    }
    fetchImage();
  }, [image]);

  return (

    <Grid container-spacing={2} alignItems="center" justifyContent="center" >
      <Grid item xs={10} sx={{ mx: 5 }}>
        <img
           //  src = {'https://dynl.mktgcdn.com/p/hxJgH_gPUGuHQPqGidqaJNMl9pbQqLO7esOuNzfyw8o/496x344.png'}
           src={`data:;base64,${image}`}
          //src={image ?  `data:image/jpeg;charset=utf-8;base64,${image}`: MyCollection[index].img } // selectedImages[index]
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
      <br />
      <Button variant="contained" component="label"
        sx={{
          backgroundColor: "darkblue",
          fontFamily: "arial",
        }}
      >

        <form
          action={"http://localhost:3003/imageProfile/" + localStorage.getItem("email")}
          encType="multipart/form-data"
          method="POST"
          sx={{ textAlign: 'center' }}>

          <input type="file" name="_profile" placeholder="Select an image" required /><br />
          <input type="submit" value="submit" />
        </form>
        {/* <UploadIcon sx={{fontSize: "medium" }} /> &nbsp; Upload
        <input hidden accept="image/*" 
                multiple type="file" 
                onChange={onSelectFile}/> */}
      </Button>

    </Grid>
  );
}