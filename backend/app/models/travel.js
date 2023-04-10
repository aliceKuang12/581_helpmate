import sql from "./db.js";

const Travel = function(travel) {
    this.userId = travel.userId;
    this.title = travel.title;
    this.category = travel.category;
    this.eventTime = travel.eventTime;
    this.location = travel.location;
    this.notes = travel.notes;
    this.ticket = travel.ticket;
    this.completed = travel.completed;
}

Travel.create = (newEvent, result) => {
    let query = "INSERT INTO travel SET ?"

    sql.query(query, newEvent, (err, res) => {
        if (err) {
            result(err,null);
            return;
        }
        result(null,res);
    })
}

Travel.getOne  = (email, result) => {
    //console.log(email)
    //const email = req.params.email;
    let query = `SELECT * FROM travel where userId = (SELECT id from users where email = ?)
                AND eventTime between SUBDATE(NOW(), INTERVAL 7 DAY) and NOW()
                ORDER BY eventTime DESC`;
    sql.query(query, [email], (err, res) => {
        if (err) {
            console.log("Cannot retrieve user's travel info: ", err);
            result(err,null);
        } else {
            console.log("User: ", res);
            result(null,res);
        }
    })
}

Travel.show = (user_id, result) => {
    let query = `SELECT * from travel`
    if (user_id) {
        query = `SELECT * from travel WHERE userId = ? AND eventTime >= NOW() ORDER BY eventTime ASC`
    }
    sql.query(query, [user_id], (err, res) => {
        if (err) {
            result(err,null);
            return;
        }
        result(null,res);
    })
}

Travel.delete = (travel_data, result) => {
    const user_id = travel_data.userId
    const title = travel_data.title
    const date = travel_data.date
    let query = `DELETE FROM travel WHERE userId = ? 
                    AND title = ?
                    AND eventTime = ?`;
    sql.query(query, [user_id,title,date], (err,res) => {
        //console.log("Query: ", query)
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

export default Travel;


