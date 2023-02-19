import session from "express-session"
import express from "express";
import * as user from "../controllers/userController.js";
import * as academic from "../controllers/academicController.js";
import * as travel from "../controllers/travelController.js";
import * as health from "../controllers/healthController.js";
import * as social from "../controllers/socialController.js";
import app from "../../server.js"
import sql from "../models/db.js";
import {google} from 'googleapis'
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

//user
app.post("/signup", (req, res) => user.createUser(req, res));

// manual userCreation method
app.post("/createUser", (req, res) => {
    const q = "INSERT INTO users (`username`, `fname`, `lname`, `email`, `password`, `cell`, `token`, `birthday`) VALUES (?)";
   // const values = ["akuang", "alice", "k", "akuang@gmail.com", "pass12","999-888-9898","alice135", "2000-01-01"];
   const values = [
    req.body.username,
    req.body.fname,
    req.body.lname,
    req.body.email,
    req.body.password,
    req.body.cell,
    req.body.token,
    req.body.birthday
   ] 
   sql.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("New user created!");
    })
})

app.get("/users", user.findAll); // works, same as "select * from users"

// get user profile based on their email
app.get("/user/:email",  (req, res) => { user.findOne(req, res)}); // same as "select * from users where email =`:email`"

//academic module
app.post("/academics/create", (req, res) => academic.createEvent(req, res));
app.get("/academics", (req, res) => academic.showAcademic(req, res));

//travel module
app.post("/travel/create", (req, res) => travel.createEvent(req, res));
app.post("/create-tokens", async (req, res, next) =>{
    try {
        console.log(req);
    } catch (error) {
        next(error);
    }
})
app.get("/travel", (req, res) => travel.showTravel(req, res));

//health module
app.post("/health/create", (req, res) => health.createEvent(req, res));
app.get("/health/", (req, res) => health.showHealth(req, res));
app.get("/health/:email", (req, res) => health.userHealth(req, res));

//social module
app.post("/social/create", (req, res) => social.createEvent(req, res));
app.get("/social/", (req, res) => social.showSocial(req, res));
app.get("/social/:email", (req, res) => social.userSocial(req, res));

app.get('/calendar', (req, res) => {
    // Create a new instance of the Calendar API client
    const auth = new google.auth.GoogleAuth({
      keyFile: './credentials.json',
      scopes: 'https://www.googleapis.com/auth/calendar'
    });
    const calendar = google.calendar({version: 'v3', auth});
  
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
