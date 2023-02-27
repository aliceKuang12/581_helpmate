import sql from "./db.js";

const Academic = function(academic) {
    this.userId = academic.userId;
    this.title = academic.title;
    this.category = academic.category;
    this.eventTime = academic.eventTime;
    this.location = academic.location;
    this.notes = academic.notes;
    this.completed = academic.completed;
}

Academic.create = (newEvent, result) => {
    let query = "INSERT INTO academic SET ?"
    sql.query(query, newEvent, (err, res) => {
        if (err) {
            result(err,null);
            return;
        }
        result(null, res);
    })
}

// return academic events based on userId
Academic.getOne  = (email, result) => {
    let query = "SELECT * FROM academic where userId = (SELECT id from users where email = ?)";
    sql.query(query, [email], (err, res) => {
        if (err) {
            console.log("Cannot retrieve user's academic info: ", err);
            result(err,null);
        } else {
            console.log("User: ", res);
            result(null,res);
        }
    })
}

// return entire table
Academic.show = (user_id, result) => {
    let query = `SELECT * from academic`;
    sql.query(query, [user_id], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    })
}

export default Academic;