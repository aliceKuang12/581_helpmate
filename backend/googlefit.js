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

//https://expressjs.com/en/guide/routing.html
const router1 = express.Router();
const router2 = express.Router();
const router3 = express.Router();

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
    //client-id,
    //client-secret,
    //link to redirect 
    url
  );
}

// Oauth2 playground / google fit sdk tutorial: https://www.youtube.com/watch?v=YMRhBPGLgmE
// simple route https://youtu.be/-yH1ZnZBWyU
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



router1.get("/steps", async (req, res) => {
  const queryURL = new urlParse(req.url);
  const code = queryParse.parse(queryURL.query).code;
  const oauth2Client = getOauth2Client("http://localhost:5000/steps");
  const tokens = await oauth2Client.getToken(code);
  res.send("localhost:5000/steps served");

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

    //console.log(result);
    stepArray = result.data.bucket;
  } catch (e) {
    console.log("Error 1: " + e);
  }

  try {
    for (const dataSet of stepArray) {
      // console.log(dataSet);
      for (const points of dataSet.dataset) {
        // console.log(points);
        for (const steps of points.point) {
          console.log(steps.value);
        }
      }
    }
  } catch (e) {
    console.log("Error 2: " + e);
  }
});
//--------------------------------------------------------------------------------

// res.cookie('Steps', steps.value).send('cookie set'); //new line

// simple route https://youtu.be/-yH1ZnZBWyU
router2.get("/getUrl2", (req, res) => {
  const oauth2Client = getOauth2Client("http://localhost:5000/sleep");
  const scopes = ["https://www.googleapis.com/auth/fitness.sleep.read profile email openid"];
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

//https://developers.google.com/fit/scenarios/write-sleep-data
// https://developers.google.com/fit/scenarios/read-sleep-data
router2.all("/sleep", async (req, res) => {
  const queryURL = new urlParse(req.url);
  const code = queryParse.parse(queryURL.query).code;
  const oauth2Client = getOauth2Client("http://localhost:5000/sleep");
  const tokens = await oauth2Client.getToken(code);
  console.log(tokens);
  res.send("server /sleep online");

  let sessionData = []
  try {
    const result = await axios({
      method: "GET",
      headers: {
        authorization: "Bearer " + tokens.tokens.access_token
      },
      "Content-Type": "application/json",
      url: `https://www.googleapis.com/fitness/v1/users/me/sessions?activityType=72`,
    });
    sessionData = result.data.session;
  } catch (e) {
    console.log("Error HTTP GET: " + e);
  }

  try {
    console.log('SLEEP session data: ');
    console.log(sessionData);
  }  catch (e) {
    console.log(e);
  }

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

    //console.log(result);
    stepArray = result.data.bucket;
  } catch (e) {
    console.log("Error 1: " + e);
  }

  try {
    for (const dataSet of stepArray) {
      // console.log(dataSet);
      for (const points of dataSet.dataset) {
        // console.log(points);
        for (const steps of points.point) {
          console.log(steps.value);
        }
      }
    }
  } catch (e) {
    console.log("Error 2: " + e);
  }

});
//--------------------------------------------------------------------------------------
router3.get("/getUrl3", (req, res) => {
  const oauth2Client = getOauth2Client("http://localhost:5000/activity");
  const scopes = ["https://www.googleapis.com/auth/fitness.activity.read profile email openid"];
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

router3.get("/activity", async (req, res) => {
  // console.log("router2 working");
  const queryURL = new urlParse(req.url);
  const code = queryParse.parse(queryURL.query).code;
  const oauth2Client = getOauth2Client("http://localhost:5000/activity");
  const tokens = await oauth2Client.getToken(code);
  // console.log(tokens);
  res.send("localhost:5000/activity");

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
            dataTypeName: "com.google.activity.segment",
            dataSourceId: "derived:com.google.activity.segment:com.google.android.apps.fitness:session_activity_segment"
          }
        ],
        bucketByTime: { durationMillis: 86400000 }, // 86400000 - 1 day
        startTimeMillis: Date.now() - 604800000, // 604800000 - 1week
        endTimeMillis: Date.now(),
      },
    });

    //console.log(result);
    stepArray = result.data.bucket;
  } catch (e) {
    console.log("Error 1: " + e);
  }

  try {
     for (const dataSet of stepArray) {
       console.log(dataSet);
       for (const points of dataSet.dataset) {
         console.log(points);
    //     for (const steps of points.point) {
    //       console.log(steps.value);
    //       // res.redirect('http://localhost:3000/health')
    //     }
      }
    }
  } catch (e) {
    console.log("Error 2: " + e);
  }
  
  //res.sendFile("../frontend/src/components/HealthCard2.js");
});

app.use(router1);
app.use(router2);
app.use(router3);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


export default {
  router1
}

export {
  router2, router3
}

