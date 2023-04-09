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

// return entire table
Academic.getAssign = (email, result) => {
    let query = `SELECT * FROM academic where userId = (SELECT id from users where email = ?) and category = \"Assignment\"`;
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

// return academic events based on userId , ignore assignments
Academic.getOne  = (email, result) => {
    let query = `SELECT * FROM academic where userId = (SELECT id from users where email = ?) and category != \"Assignment\" ORDER BY eventTime DESC`;
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
    let query = `SELECT * from academic WHERE category != \"Assignment\"`;
    if (user_id) {
        query = `SELECT * from academic WHERE userId = ? AND category != \"Assignment\" ORDER BY eventTime DESC`
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


// return entire table
Academic.show2 = (user_id, result) => {
    let query = `SELECT * from academic WHERE category = \"Assignment\"`;
    if (user_id) {
        query = `SELECT * from academic WHERE userId = ? AND category = \"Assignment\" ORDER BY eventTime DESC`
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
    const title = req.title;
    const user_id = req.userId;
    const category = req.category;
    const date = req.date;
    //const email = req.params.email;
    //let query = `DELETE FROM academic WHERE title = ? and email = ?`;
    let query = `DELETE FROM academic WHERE userID = ? 
                    AND title = ?
                    AND category = ?
                    AND eventTime = ?`;
    sql.query(query, [user_id,title, category,date], (err,res) => {
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