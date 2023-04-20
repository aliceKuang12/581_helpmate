/***
 * googlefit.js
 * 
 * NOTE: retired since had trouble throwing information to frontend.
 * 
 * Gets last seven days of steps data from googlefit application. User can connect their
 * apple or garmin watch to an external application like HealthSync to send data to googlefit
 * or manually enter their data. 
 * 
 * A suggested bug fix for this app is having the user be able to get the data starting from
 * 12:01am rather than the current time and switching an application altogether, such as 
 * MyFitnessPal which can directly link to many smartwatches but requires a developer key.
 * 
 * Author: Alice Kuang
 * Since: 12/28/23
 */


import express from "express";
import session from "express-session";
const app = express();
import cors from "cors"
import { google } from "googleapis"
import request from "request"
import urlParse from "url-parse"
import queryParse from "query-string"
import bodyParser from "body-parser";
import axios from "axios";
import env from '../.env.js';

//https://expressjs.com/en/guide/routing.html
const router1 = express.Router();

app.use(express.static('frontend'))
app.use(express.json()); // parse requests of content-type - application/json

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// store session data
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "sessions",
    cookie: {
      maxAge: 1000 * 60 * 60,
      sameSite: "none",
      // httpOnly: false,
      secure: false,
    },
  })
);

function getOauth2Client(url) {
  return new google.auth.OAuth2(    
    env.googleFit.client_id,
    env.googleFit.client_secret,
    url
  );
}

// Oauth2 playground / google fit sdk tutorial: https://www.youtube.com/watch?v=YMRhBPGLgmE
// simple route https://youtu.be/-yH1ZnZBWyU
// gets google account authentication
router1.get("/getUrl", (req, res) => {

  // console.log("router1 working");
  const oauth2Client = getOauth2Client("http://localhost:5000/steps");

  const scopes = ["https://www.googleapis.com/auth/fitness.activity.read profile email openid",
                  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    state: JSON.stringify({
      callbackUrl: req.body.callbackUrl,
      userId: req.body.userId
    })
  });

  request(url, (err, response, body) => {
    console.log("error: ", err);
    console.log("statusCode: ", response && response.statusCode);
    res.send({ url });
  });

});


// retrieves last 7 days history of step data. 
router1.get("/steps", async (req, res) => {
  const queryURL = new urlParse(req.url);
  const code = queryParse.parse(queryURL.query).code;
  const oauth2Client = getOauth2Client("http://localhost:5000/steps");
  const tokens = await oauth2Client.getToken(code);

  console.log('//------------------------------------------------')
  let stepArray = []
  try {
    const result = await axios({
      method: "POST",
      headers: {
        authorization: "Bearer " + tokens.tokens.access_token
      },
      "Content-Type": "application/json",
      url: `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
      data: {
        aggregateBy: [
          {
            dataTypeName: "com.google.step_count.delta",
            dataSourceId: "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
          }
        ],
        bucketByTime: { durationMillis: 86400000 }, // 86400000 - 1 day
        startTimeMillis: Date.now() - 604800000, // 604800000 - 1week
        endTimeMillis: Date.now(),
      },
    });

    stepArray = result.data.bucket;
  } catch (e) {
    console.log("Error 1: " + e);
  }

  try {
    let entries=[];
    for (const dataSet of stepArray) {
      // console.log(dataSet);
      for (const points of dataSet.dataset) {
        // console.log(points);
        for (const steps of points.point) {
          console.log(steps.value);
          entries.push(steps.value)
        }
      }
    }
    res.send(entries);
  } catch (e) {
    console.log("Error 2: " + e);
  }
});


app.use(router1);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


export default {
  router1
}


