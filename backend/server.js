const sql = require("./app/models/db.js");
const express = require('express');

const cors = require("cors");
const email = require("./app/services/sendGrid.js") 

const app = express();

// var corsOptions = {
//   origin: "http://localhost:8081"
// };

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */


// simple route
app.get("/", (req, res) => {
  console.log(sql.infor)
  // res.json({ message: "" });/
  res.json({name:"Drake"});
});

// set port, listen for requests
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.post('/email-confirmation', async (req, res) => {
  try {
    res.json(await email.sendMail(req.body.to, req.body.from, req.body.subject, req.body.text));
    res.sendStatus(200)
  } catch (err) {
    console.log("ERRR")
    console.log(err);
  }
});