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
import cors from "cors"
import bodyParser from "body-parser";
import session from "express-session"
import express from "express";
import * as user from "../controllers/userController.js";
import * as academic from "../controllers/academicController.js";
import * as image from "../controllers/imageController.js";
import * as travel from "../controllers/travelController.js";
import * as health from "../controllers/healthController.js";
import * as social from "../controllers/socialController.js";
// import app from "../../server.js"
import { google } from 'googleapis'
import { resetPasswordMail } from "../mailer/actions/authMailer.js";

const app = express();
var corsOptions = {
  origin: "http://localhost:3000"
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extende: true }));
app.use(bodyParser.json());
app.use(express.json());


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
app.put("/user", (req,res) => user.updateUser(req,res));


//image module
app.get("/imageRefs", (req, res) => image.showImageRefs(req, res));
app.get("/imageRefs/:email", (req, res) => image.userImageRefs(req, res));
app.get("/profileUrl/:email", (req, res) => image.profileRefs(req, res));

// image url paths
app.post("/imageProfile2/:email", (req, res) => image.updateProfileRefs(req, res));

//academic module
app.get("/academics", (req, res) => academic.showAcademic(req, res));
app.post("/academics/create", (req, res) => { academic.createEvent(req, res)});
app.get("/assignment", (req, res) => { academic.showAssign(req, res) });
app.put("/academics/update/", (req, res) => { academic.updateAcademic(req, res) });
app.delete("/academics/delete", (req, res) => { academic.deleteEvent(req, res) });
app.get("/academics/streak1/", (req, res) => academic.assignments(req, res));


//health module
app.get("/healths", (req, res) => health.showHealth(req, res));
app.get("/health/steps/", (req, res) => health.userSteps(req, res));
app.get("/health/activity/", (req, res) => health.userActivity(req, res));
app.post("/health/create", (req, res) => health.createEvent(req, res));
// app.post("/health/createQuick", (req, res) => health.createEvent(req, res));
app.put("/health/update/", (req, res) => { health.updateHealth(req, res) });
app.delete("/health/delete/", (req, res) => { health.deleteEvent(req, res) });
app.get("/health/streak1/", (req, res) => health.stepStreak(req, res));
app.get("/health/streak2/", (req, res) => health.activityStreak(req, res));


//travel module
app.post("/travel/create", (req, res) => travel.createEvent(req, res));
app.get("/travels", (req, res) => travel.showTravel(req, res));
app.put("/travel/update/", (req, res) => { travel.updateTravel(req, res) });
app.delete("/travel/delete/", (req, res) => { travel.deleteEvent(req, res) });

//social module
app.get("/social", (req, res) => social.showSocial(req, res));
app.post("/social/create", (req, res) => { social.createEvent(req, res) });
app.put("/social/update", (req, res) => social.updateSocial(req, res));
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

// set port, listen for requests
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
