/**
 * multer.js 
 *
 * Note: Retired since reading stored images too slow. 
 * 
 * Stores locally uploaded images to the backend/upload folder and saves the relative path of the image
 * to the ImageRef table in database. Implementation details in imageController and models/image.  
 *
 * Author: Alice Kuang. 
 * Since:  3/26/23
 */


// enable uploads folder to be statically served to frontend, i.e. localhost:3003/static/FILENAME.EXT
// ref for resolving module problem: https://codingbeautydev.com/blog/javascript-dirname-is-not-defined-in-es-module-scope/

import multer from "multer";
import path from 'path'
import { fileURLToPath } from 'url'; 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/static', express.static(path.join(__dirname, '..\\..\\', '/uploads'))); 

// Setup storage to save file with jpg extension to local disk
// https://stackoverflow.com/questions/31592726/how-to-store-a-file-with-file-extension-with-multer

var storage = multer.diskStorage({
  destination: function (req, file, cb) { // save file to uploads folder
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) { //Save file now as current data + ".jpg"
    cb(null, Date.now() + '.jpg') 
  }, 
  fileFilter: function (req, file, cb){ // set allowed upload types
    var filetypes = /jpeg|jpg|png/;
    cb("Error: File upload only supports the "
    + "following filetypes - " + filetypes);
  }
})


var maxSize = 1 * 1000 * 1000; 
var upload = multer({ storage: storage, limits: { fileSize: maxSize } }) ;

// multer image paths
app.post("/imageProfile/:email", upload.single('_profile'), (req, res) => image.updateProfileRefs(req, res));
app.post("/imageSocial/:email", upload.array('_social', 3), (req, res) => image.updateSocialRefs(req, res));
app.post("/imageTravel/:email", upload.array('_travel', 3), (req, res) => image.updateTravelRefs(req, res));


/* 
// controller/imageController: update social
export const updateSocialRefs = (req, res) => {
    if (!req.params) {
        return res.status(400).send({
            message: "Content cannot be empty"
        })
    }

    console.log(req) // req.file, req.body
    Images.update2(req, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving image paths."
            })
        }
        res.status(200).send(data);
    })
}



// models/image: update social, saving relative paths of 3 photos
Images.update2 = (req, result) => {
  const fp = req.files; // array of files
  const email = req.params.email;
  console.log(fp)

  let query = `UPDATE imagerefs SET social1=?, social2=?, social3=? WHERE userId = (SELECT id from users where email = ?)`; 
  sql.query(query, [fp[0].filename, fp[1].filename, fp[2].filename, email], (err, res) => { // fp[0].path, fp[1].path, fp[2].path
      if (err) {
          console.log(err);
          result(err, null);
          return;
      }
     
      console.log(fp);
      result(null, res);
  })
}
*/