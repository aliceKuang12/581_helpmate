import sql from "./db.js";

const Health = function(health) {
    this.userId = health.userId;
    this.title = health.title;
    this.category = health.category;
    this.eventTime = health.eventTime;
    this.location = health.location;
    this.notes = health.notes;
    this.completed = health.completed;
}

Health.create = (newEvent, result) => {
    let query = "INSERT INTO health SET ?"
    sql.query(query, newEvent, (err, res) => {
        if (err) {
            result(err,null);
            return;
        }
        result(null, res);
    })
}


Health.getOne  = (email, result) => {
    console.log(email)
    //const email = req.params.email;
    //let q1 = "SELECT userId from users where email = ?" ;
  //  let query = "SELECT * FROM health where userId = (SELECT userId from users where email = ?)";
    let query = `SELECT * FROM health where userId = (SELECT id from users where email = ?)`;
    sql.query(query, [email], (err, res) => {
        if (err) {
            console.log("Cannot retrieve user with email: ", err);
            result(err,null);
        } else {
            console.log("User: ", res);
            result(null,res);
        }
    })
}

Health.show = (user_id, result) => {
    // WHERE userId = ? 
    // implement when pulling data with a specific userID
    let query = `SELECT * from health`;
    sql.query(query, [user_id], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    })
}


export default Health;