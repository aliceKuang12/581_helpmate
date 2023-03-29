import sql from "./db.js";

const Social = function(social) {
    this.userId = social.userId;
    this.title = social.title;
    this.category = social.category;
    this.eventTime = social.eventTime;
    this.location = social.location;
    this.notes = social.notes;
    this.completed = social.completed;
}

Social.create = (newEvent, result) => {
    let query = "INSERT INTO social SET ?"
    sql.query(query, newEvent, (err, res) => {
        if (err) {
            result(err,null);
            return;
        }
        result(null, res);
    })
}

Social.getOne  = (email, result) => {
    console.log(email)
    //const email = req.params.email;
    //let q1 = "SELECT userId from users where email = ?" ;
  //  let query = "SELECT * FROM health where userId = (SELECT userId from users where email = ?)";
    let query = `SELECT * FROM social where userId = (SELECT id from users where email = ?)`;
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


Social.show = (user_id, result) => {
    // WHERE userId = ? 
    // implement when pulling data with a specific userID
    let query = `SELECT * from social`;
    sql.query(query, [user_id], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    })
}

Social.delete = (title, result) => {
    let query = `DELETE FROM social WHERE title = ?`;
    sql.query(query, [title], (err,res) => {
        if(err) {
            console.log("Unable to delete event: ", err);
            result(err,null);
        }
        else {
            console.log("Event deleted: ",res);
            result(null,res);
        }
    }) 
}

export default Social;