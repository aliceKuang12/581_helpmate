/**
 * Author: Alice Kuang
 * Update Date: 3/11/23
 * Creation Date: 2/20/23
 * Description: Intermediary controller for health event creation and retreival; 
 *      get all users health or specific categories (i.e. steps and activities)
 */

import Health from "../models/health.js"
import sql from "../models/db.js";

export const createEvent = (req, res) => {
    const newEvent = new Health({
        userId: req.body.userId,
        title: req.body.title,
        category: req.body.category,
        eventTime: req.body.date + " " + req.body.time,
        location: req.body.location,
        notes: req.body.notes,
        completed: req.body.completed,
    })
    Health.create(newEvent, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "An error has occured while creating a new heatlh event"
            })
        }
        return res.status(200).send(data);
    })
}

export const createQuickHealth = (req, res) => {
    const newEvent = new Health({
        userId: req.body.userId,
        title: req.body.title,
        category: req.body.category,
        eventTime: req.body.date,
        location: req.body.location,
        notes: req.body.notes,
        completed: req.body.completed,
    })
    Health.create(newEvent, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "An error has occured while creating a new heatlh event"
            })
        }
        return res.status(200).send(data);
    })
}



// get steps, query by userid 
export const userSteps = (req, res) => {
    const user_id = req.query.user_id;
    Health.getOne1(user_id, (err, data) => {
        if (err) {
            return res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving health for user."
            });
        }
        //console.log("Health data:", data);
        res.send(data);
    });
}

// get activity, query by userid 
export const userActivity = (req, res) => {
    const user_id = req.query.user_id;
    Health.getOne2(user_id, (err, data) => {
        if (err) {
            return res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving health for user."
            });
        }
        
        res.send(data);
    });
}

// get activity, query by email 
export const stepStreak = (req, res) => {
    Health.getStreaks1(req.query.user_id, (err, data) => {
        if (err) {
            return res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving health for user."
            });
        }
        res.send(data);
    });
}

export const activityStreak = (req, res) => {
    Health.getStreaks2(req.query.user_id, (err, data) => {
        if (err) {
            return res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving health for user."
            });
        }        
        res.send(data);
    });
}

export const showHealth = (req, res) => {
    Health.show(req.query.user_id, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving heatlh events."
            })
        }
        res.status(200).send(data);
    })
}

// update user info on profile page
export const updateHealth = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty"
        })
    }

    let user_id = req.body.userId;
    let query = "SELECT * FROM health where userId = ?";
    sql.query(query, [user_id], (err, result) => {
        if (err) {
            console.log("Unable to find events with id ", user_id)
        } else {
            const updated = req.body;
            Health.update(updated, user_id, (err, data) => {
                if (err) {
                    return res.status(500).send({
                        message: err.message || "Error occurred while updating user."
                    });
                }
                res.send(data);
            });
        }
    })
}

export const deleteEvent = (req,res) => {
    const health_data = req.body.data
    console.log("Data: ", health_data)
    Health.delete(health_data, (err,data) => {
        if(err) {
            return res.status(500).send({
                message:
                    err.message || "Error occurred while deleting event."
            });
        }
        res.send(data);
    })
}