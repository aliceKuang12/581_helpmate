const sql = require("./db.js");

// constructor
const Tutorial = function(tutorial) {
  this.title = tutorial.title;
  this.description = tutorial.description;
  this.published = tutorial.published;
};

Tutorial.getAll = (title, result) => {
    let query = "SELECT * FROM User";
  
    // if (title) {
    //   query += ` WHERE title LIKE '%${title}%'`;
    // }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("tutorials: ", res);
      result(null, res);
    });
  };



  module.exports = Tutorial;
