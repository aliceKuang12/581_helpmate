/**
 * Author: Alice Kuang
 * Update Date: 3/11/23
 * Creation Date: 2/20/23
 * Description: Intermediary controller for health event creation and retreival; 
 *      get all users health or specific categories (i.e. steps and activities)
 */

import Health from "../models/health.js"

export const createEvent = (req, res) => {
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

// update user info on profile page
export const updateEvent = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty"
        })
    }
    let email = req.params.email;
    let query = "SELECT * FROM users where email = ?";
    sql.query(query, [email], (err, result) => {
        if (err) {
            console.log("Error occur while find user with email ", email)
        } else {
            Health.update(req, result[0].id, (err, data) => {
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


// get steps, query by email 
export const userSteps = (req, res) => {
    const email = req.params.email;
    // const cat = req.params.category;
    Health.getOne1(email, (err, data) => {
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

// get activity, query by email 
export const userActivity = (req, res) => {
    const email = req.params.email;
    // const cat = req.params.category;
    Health.getOne2(email, (err, data) => {
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
    const email = req.params.email;
    Health.getStreaks1(email, (err, data) => {
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
    const email = req.params.email;
    Health.getStreaks2(email, (err, data) => {
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

export const deleteEvent = (req,res) => {
    //const title = req.body.data.title
    const health_data = req.body.data
    //console.log(title);
    console.log("Data: ", health_data)
    //Health.delete(title, (err,data) => {
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