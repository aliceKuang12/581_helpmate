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
    let query = `SELECT * FROM academic where userId = (SELECT id from users where email = ?)
                AND eventTime between SUBDATE(NOW(), INTERVAL 7 DAY) and NOW()
                ORDER BY eventTime DESC`;
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

// return assignment completion streak
Academic.getStreak  = (email, result) => {
    let query = `SELECT count(*) as streak FROM academic where userId = (SELECT id from users where email = ?) 
                 AND Category=\"Assignment\" AND completed=1 
                 AND eventTime between SUBDATE(NOW(), INTERVAL 7 DAY) and NOW();`;
    sql.query(query, [email], (err, res) => {
        if (err) {
            console.log("Cannot retrieve user's assignment streak: ", err);
            result(err,null);
        } else {
            console.log("Assignment Streak: ", res);
            result(null,res);
        }
    })
}


// return entire table
Academic.show = (user_id, result) => {
    let query = `SELECT * from academic`;
    if (user_id) {
        query = `SELECT * from academic WHERE userId = ? ORDER BY eventTime DESC`
    }
    sql.query(query, [user_id], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    })
}

Academic.update = (req, id, result) => {
     const title = req.body.data.title;
     let query = `UPDATE users SET ? WHERE userId = ? and title = ?`;
     sql.query(query, [req.body.data, id, title], (err, res) => {
         if (err) {
             console.log("Cannot update: ", err);
             result(err,null);
         } else {
             console.log("All users: ", res);
             result(null,res);
         }
     })
 }

Academic.delete = (req, result) => {
    const title = req.body.data.title;
    const email = req.params.email;
    let query = `DELETE FROM academic WHERE title = ? and email = ?`;
    sql.query(query, [title, email], (err,res) => {
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

export default Academic;