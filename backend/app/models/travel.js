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

Travel.show = (user_id, result) => {
    // WHERE userId = ${user_id}
    // add to end of querery when checking userId
    let query = `SELECT * from travel`
    sql.query(query, (err, res) => {
        if (err) {
            result(err,null);
            return;
        }
        result(null,res);
    })
}

export default Travel;


