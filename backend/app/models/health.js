/**
 * Author: Alice Kuang
 * Update Date: 2/25/23
 * Creation Date: 2/20/23
 * Description: Methods for creating a health event and retreiving health events with for 
 *      specific categories (i.e. steps and activities)
 */

import sql from "./db.js";

const Health = function (health) {
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
            result(err, null);
            return;
        }
        result(null, res);
    })
}

Health.update = (req, id, result) => {
    const title = req.body.data.title;
    let query = `UPDATE health SET ? WHERE userId = ? and title = ?`;
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


// query for steps category given user email
Health.getOne1 = (email, result) => {
    let query = `SELECT * FROM health where userId = (SELECT id from users where email = ?) 
                AND eventTime between SUBDATE(NOW(), INTERVAL 7 DAY) and NOW()
                and category =\"Steps\" ORDER BY eventTime DESC`;
    sql.query(query, [email], (err, res) => {
        if (err) {
            console.log("Cannot retrieve event for given user or category: ", err);
            result(err, null);
        } else {
            console.log("Health event: ", res);
            result(null, res);
        }
    })
}

// query for activity category given user email
Health.getOne2 = (email, result) => {
    let query = `SELECT * FROM health where userId = (SELECT id from users where email = ?) 
                AND eventTime between SUBDATE(NOW(), INTERVAL 7 DAY) and NOW()
                and category =\"Activity\" ORDER BY eventTime DESC`;
    sql.query(query, [email], (err, res) => {
        if (err) {
            console.log("Cannot retrieve event for given user or category: ", err);
            result(err, null);
        } else {
            console.log("Health event: ", res);
            result(null, res);
        }
    })
}

// query for activity streak given user email
Health.getStreaks1 = (user_id, result) => {
    let query = `SELECT count(*) as streak FROM health where userId = ? 
                AND eventTime between SUBDATE(NOW(), INTERVAL 7 DAY) and NOW()
                and category =\"Activity\"`;
    sql.query(query, [user_id], (err, res) => {
        if (err) {
            console.log("Cannot retrieve steps streak: ", err);
            result(err, null);
        } else {
            console.log("Health event: ", res);
            result(null, res);
        }
    })
}

// query for steps streak given user email
Health.getStreaks2 = (user_id, result) => {
    let query = `SELECT count(*) as streak FROM health where userId = ? 
             AND eventTime between SUBDATE(NOW(), INTERVAL 7 DAY) and NOW()
             and category =\"Steps\"`;
    sql.query(query, [user_id], (err, res) => {
        if (err) {
            console.log("Cannot retrieve activities streak: ", err);
            result(err, null);
        } else {
            console.log("Health event: ", res);
            result(null, res);
        }
    })
}


Health.show = (user_id, result) => {
    // WHERE userId = ? 
    // implement when pulling data with a specific userID
    let query = `SELECT * from health WHERE (category != \"Steps\") and (category !=\"Activity\")`;
    if (user_id) {
        query = `SELECT * from health WHERE (category != \"Steps\") and (category !=\"Activity\") and userId = ? ORDER BY eventTime DESC`
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

Health.delete = (title, result) => {
    let query = `DELETE FROM health WHERE title = ?`;
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

export default Health;