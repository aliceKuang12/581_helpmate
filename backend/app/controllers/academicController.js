import Academic from "../models/academic.js";
import sql from "../models/db.js";

export const createEvent = (req, res) => {
    const newEvent = new Academic({
        userId: req.body.userId,
        title: req.body.title,
        category: req.body.category,
        eventTime: req.body.date,
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

export const userAcademic = (req, res) => {
    const email = req.params.email;
    Academic.getOne(email, (err, data) => {
        if (err) {
            return res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving user's academic info."
            });
        }
        
        res.send(data);
    });
}

export const assignments = (req, res) => {
    const email = req.params.email;
    Academic.getStreak(email, (err, data) => {
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
    Academic.show(req.query.userId, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving academic events."
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
    let email = req.params.email;
    let query = "SELECT * FROM users where email = ?";
    sql.query(query, [email], (err, result) => {
        if (err) {
            console.log("Error occur while find user with email ", email)
        } else {
            Academic.update(req, result[0].id, (err, data) => {
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
    Academic.delete(req, (err,data) => {
        if(err) {
            return res.status(500).send({
                message:
                    err.message || "Error occurred while deleting event."
            });
        }
        res.send(data);
    })
}
