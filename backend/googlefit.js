
import express from "express";
import cors from "cors"
import { google } from "googleapis"
import request from "request"
import urlParse from "url-parse"
import queryParse from "query-string"
import bodyParser from "body-parser";
import axios from "axios"
import sql from "./app/models/db.js"
import { DATE } from "sequelize";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extende: true }));
app.use(bodyParser.json());

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// simple route https://youtu.be/-yH1ZnZBWyU
app.get("/getUrl", (req, res) => {

  const oauth2Client = new google.auth.OAuth2(
    //client-id,
    //client-secret,
    //link to redirect
    "http://localhost:5000/steps"
  );

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

app.get("/getUrl", async (req, res) => {
  const queryURL = new urlParse(req.url);
  const code = queryParse.parse(queryURL.query).code;
  const oauth2Client = new google.auth.OAuth2(
    //client-id,
    //client-secretr,
    //link to redirect
    "http://localhost:5000/steps"
  );

  const tokens = await oauth2Client.getToken(code);
  res.send("Hello");

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
          bucketByTime: { durationMillis: 86400000 },
          startTimeMillis: Date.now() - 604800000,
          endTimeMillis: Date.now(),
        },
      });
   
      //console.log(result);
      stepArray = result.data.bucket;
  } catch(e) {
    console.log("Error 1: " + e);
  }

  try{
    for(const dataSet of stepArray) {
     // console.log(dataSet);
      for(const points of dataSet.dataset) {
       // console.log(points);
        for(const steps of points.point){
          console.log(steps.value);
        }
      }
    }
  } catch(e) {
    console.log("Error 2: " + e);
  }
});

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
