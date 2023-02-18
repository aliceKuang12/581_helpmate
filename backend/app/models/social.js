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

export default Social;