import Academic from "../models/academic.js";
import sql from "../models/db.js";

export const createEvent = (req, res) => {
    const newEvent = new Academic({
        userId: req.body.userId,
        title: req.body.title,
        category: req.body.category,
        eventTime: req.body.date + " " + req.body.time,
        location: req.body.location,
        notes: req.body.notes,
        completed: req.body.completed,
    })
    Academic.create(newEvent, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                message: err.message || "An error has occured while creating a new Academic event"
            })
        }
        return res.status(200).send(data);
    })
}


export const assignments = (req, res) => {
    Academic.getStreak(req.query.user_id, (err, data) => {
        if (err) {
            return res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving user's academic info."
            });
        }
        
        res.send(data);
    });
}

export const showAcademic = (req, res) => {
    Academic.show(req.query.user_id, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving academic events."
            })
        }
        res.status(200).send(data);
    })
}


// get user's academic event with Category "Assignment"
export const showAssign = (req, res) => {
    Academic.show2(req.query.user_id, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving assignments."
            })
        }
        res.status(200).send(data);
    })
}

// update user info on profile page
export const updateAcademic = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty"
        })
    }

    let user_id = req.body.userId;
    let query = "SELECT * FROM academic where userId = ?";
    sql.query(query, [user_id], (err, result) => {
        if (err) {
            console.log("Unable to find events with id ", user_id)
        } else {
            const updated = req.body;
            Academic.update(updated, user_id, (err, data) => {
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
    const academic_data = req.body.data;
    console.log("Data: ", academic_data)
    Academic.delete(academic_data, (err,data) => {
        if(err) {
            return res.status(500).send({
                message:
                    err.message || "Error occurred while deleting event."
            });
        }
        res.send(data);
    })
}
