/**
 * UploadImageProfile
 * 
 * Note: RETIRED- currently using  UrlProfile.js to get photos
 * 
 * The upload profile functionality allows you to upload 1 image and sends the 
 * image to be saved in the upload folder on the backend. We save the filename to 
 * localStorage and access where the file is stored on backend to display on the frontend.
 * 
 * Author: Alice Kuang
 * Since: 3/24/23
 */

import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import DefaultImage from '../../images/socialimage.jpg'
import img from '../../images/ku1.jpg'
import { Card } from '@mui/material';
import axios from 'axios'

export default function UploadImage() {

  const MyCollection = [
    {
      label: "First Picture",
      img: img,
    },
  ];

  const [index, setActiveStep] = React.useState(0);
  const [file, setFile] = useState("Invalid Image Source");
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchImage = async () => {

      // upload the photo
      const promise1 = await axios.get("http://localhost:3003/imageRefs/" + localStorage.getItem('email'))
        .then(res => {
          const data = res.data;
          data.map(d => {localStorage.setItem('profile', d.profile1); 
                         setImage(data);});
          console.log(res.data);
        })
        .catch(err => {
          console.log(err)
        });

      // display image with axios: https://stackoverflow.com/questions/69400766/get-image-through-axios-how-to-display-on-my-react-project
      // call to multer middleware on backend
      const url = "http://localhost:3003/static/" + localStorage.getItem('profile');
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
          console.log('image retreived');
        })
        .catch(err => {
          console.log(err)
        });

      Promise.all([promise1, promise2]).then(function (values) {
        console.log(values);
      });
    }
    fetchImage();
  }, []);

  return (
    <Grid container-spacing={2} alignItems="center" justifyContent="center" >
      <Grid item xs={10} sx={{ mx: 5 }}>

        <img
          src={image  ? `data:;base64,${image}`:  MyCollection[index].img }
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
      <Grid item xs={7} sx={{ mx: 12 }}>
       
        <Card sx={{
          textAlign: 'center',
          width: '100%',
          backgroundColor: "primary.main",
          fontFamily: "arial",
        }}>
          <form
            sx={{ textAlign: 'center' }}
            action={"http://localhost:3003/imageProfile/" + localStorage.getItem("email")}
            encType="multipart/form-data"
            method="POST">
            <input type="file" name="_profile" placeholder="Select an image" required /><br />
            <input type="submit" value="submit" />
          </form>
        </Card>
      </Grid>
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