const sql = require("./app/models/db.js");
const express = require('express');

const cors = require("cors");
  
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */


// simple route
app.get("/", (req, res) => {
  console.log(sql.infor)
  // res.json({ message: "" });/
  res.json({name:"Drake"});
});

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
