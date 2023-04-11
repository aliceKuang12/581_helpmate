/**
 * routes.js 
 *
 * routes to connect the frontend to the backend databases.
 * Includes all APIs to get and post.
 *
 * @link   URL
 * @file   This file defines the routes class.
 * @author Eva Morrison. Alice Kuang. Minh Huyen Nguyen. Minh Thong Pham. 
 * @since  2/26/23
 */

import session from "express-session"
import express from "express";
import * as user from "../controllers/userController.js";
import * as academic from "../controllers/academicController.js";
import * as image from "../controllers/imageController.js";
import * as travel from "../controllers/travelController.js";
import * as health from "../controllers/healthController.js";
import * as social from "../controllers/socialController.js";
import app from "../../server.js"
import multer from "multer";
import sql from "../models/db.js";
import { google } from 'googleapis'
import { resetPasswordMail } from "../mailer/actions/authMailer.js";

// enable uploads folder to be statically served to frontend, i.e. localhost:3003/static/FILENAME.EXT
// ref for resolving module problem: https://codingbeautydev.com/blog/javascript-dirname-is-not-defined-in-es-module-scope/
import path from 'path'
import { fileURLToPath } from 'url'; 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// console.log(path.join(__dirname, '..\\..\\', '/uploads'));
app.use('/static', express.static(path.join(__dirname, '..\\..\\', '/uploads'))); 

// Setup storage to save file with jpg extension to local disk
// https://stackoverflow.com/questions/31592726/how-to-store-a-file-with-file-extension-with-multer

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg') //Appending .jpg
  }, 
  fileFilter: function (req, file, cb){ 
    var filetypes = /jpeg|jpg|png/;
    cb("Error: File upload only supports the "
    + "following filetypes - " + filetypes);
  }
})

var maxSize = 1 * 1000 * 1000; 
var upload = multer({ storage: storage, limits: { fileSize: maxSize } }) ;
// var upload2 = multer({ storage: storage, limits: { fileSize: maxSize } }) ; // upload.fields([{ name: '_social', maxCount: 3 }]);

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

//session
app.post("/login", express.urlencoded({ extended: false }), (req, res, next) => user.login(req, res, next));
app.get("/logout", (req, res, next) => {
  req.session.user = null;
  req.session.save(function (err) {
    if (err) next(err)
    req.session.regenerate(function (err) {
      if (err) next(err)
      res.redirect('/')
    })
  })
})
app.post("/reset-password-email", (req,res) => resetPasswordMail(req,res));

//user
app.post("/signup", (req, res) => { user.createUser(req, res) });
app.get("/users", user.findAll); // works, same as "select * from users"
app.get("/user/:email", (req, res) => { user.findOne(req, res) }); // same as "select * from users where email =`:email`"
app.put("/user", (req,res) => user.updateUser(req,res));
//app.post("/profile/:email", (req,res) => user.updateProfile(req,res));


//image module
app.get("/imageRefs", (req, res) => image.showImageRefs(req, res));
app.get("/imageRefs/:email", (req, res) => image.userImageRefs(req, res));
app.get("/profileUrl/:email", (req, res) => image.profileRefs(req, res));
// image url paths
app.post("/imageProfile2/:email", (req, res) => image.updateProfileRefs(req, res));
// multer image paths
app.post("/imageProfile/:email", upload.single('_profile'), (req, res) => image.updateProfileRefs(req, res));
app.post("/imageSocial/:email", upload.array('_social', 3), (req, res) => image.updateSocialRefs(req, res));
app.post("/imageTravel/:email", upload.array('_travel', 3), (req, res) => image.updateTravelRefs(req, res));

//academic module
app.post("/academics/create", (req, res) => {
  console.log(req.body);
  academic.createEvent(req, res)
});
app.get("/academics", (req, res) => academic.showAcademic(req, res));
app.get("/assignment", (req, res) => { academic.showAssign(req, res) });
app.get("/academics/:email", (req, res) => academic.userAcademic(req, res));
app.get("/academics/streak1/:email", (req, res) => academic.assignments(req, res));
app.delete("/academics/delete/:email", (req, res) => { academic.deleteEvent(req, res) });
app.put("/academics/update/:email", (req, res) => { academic.updateAcademic(req, res) });



//travel module
app.post("/travel/create", (req, res) => travel.createEvent(req, res));
app.get("/travels", (req, res) => travel.showTravel(req, res));
app.get("/travel/:email", (req, res) => travel.userTravel(req, res));
app.put("/travel/update/:email", (req, res) => { academic.updateAcademic(req, res) });
app.delete("/travel/delete/", (req, res) => { travel.deleteEvent(req, res) });

//health module
app.post("/health/create", (req, res) => health.createEvent(req, res));
app.post("/health/createQuick", (req, res) => health.createEvent(req, res));
app.get("/healths", (req, res) => health.showHealth(req, res));
app.get("/health/steps/:email", (req, res) => health.userSteps(req, res));
app.get("/health/activity/:email", (req, res) => health.userActivity(req, res));
app.get("/health/streak1/:email", (req, res) => health.stepStreak(req, res));
app.get("/health/streak2/:email", (req, res) => health.activityStreak(req, res));
app.delete("/health/update/:email", (req, res) => { health.updateEvent(req, res) });
app.delete("/health/delete/", (req, res) => { health.deleteEvent(req, res) });

//social module
app.post("/social/create", (req, res) => { social.createEvent(req, res) });
app.get("/social", (req, res) => social.showSocial(req, res));
app.get("/social/:email", (req, res) => social.userSocial(req, res));
app.delete("/social/delete/", (req, res) => { social.deleteEvent(req, res) });



//google calendar paths
app.post("/create-tokens", async (req, res, next) => {
  try {
    console.log(req);
  } catch (error) {
    next(error);
  }
})

app.get('/calendar', (req, res) => {
  // Create a new instance of the Calendar API client
  const auth = new google.auth.GoogleAuth({
    keyFile: './credentials.json',
    scopes: 'https://www.googleapis.com/auth/calendar'
  });
  const calendar = google.calendar({ version: 'v3', auth });

  // Make a request to the Calendar API to retrieve a list of events
  calendar.events.list({
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, response) => {
    if (err) {
      console.error('Error retrieving events:', err);
      res.status(500).send('Error retrieving events');
    } else {
      // Send the event data back to the front end as a response
      res.json(response.data);
    }
  });
});

