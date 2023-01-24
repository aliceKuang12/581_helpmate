import infor  from "./app/models/db.js";
import cors from "cors";
import express from "express"
// var corsOptions = {
  //   origin: "http://localhost:8081"
  // };
  
const app = express();
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */


// simple route
app.get("/", (req, res) => {
  console.log(infor)
  res.json({name:"Drake"});
});

// set port, listen for requests
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});