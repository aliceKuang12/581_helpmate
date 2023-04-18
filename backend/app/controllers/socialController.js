import Social from "../models/social.js"
import sql from "../models/db.js";

export const createEvent = (req, res) => {
    const newEvent = new Social({
        userId: req.body.userId,
        title: req.body.title,
        category: req.body.category,
        eventTime: req.body.date,
        location: req.body.address,
        notes: req.body.notes,
        photo: req.body.photo,
        completed: req.body.completed,
    })
    Social.create(newEvent, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "An error has occured while creating a new social event"
            })
        }
        return res.status(200).send(data);
    })
}

export const showSocial = (req, res) => {
    Social.show(req.query.user_id, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving social events."
            })
        }
        res.status(200).send(data);
    })
}

// update user info on profile page
export const updateSocial = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty"
        })
    }

    let user_id = req.body.userId;
    let query = "SELECT * FROM social where userId = ?";
    sql.query(query, [user_id], (err, result) => {
        if (err) {
            console.log("Unable to find events with id ", user_id)
        } else {
            const updated = req.body;
            Social.update(updated, user_id, (err, data) => {
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
    const social_data = req.body.data;
    //console.log("Social Data: ", social_data)
    Social.delete(social_data, (err,data) => {
        if(err) {
            return res.status(500).send({
                message:
                    err.message || "Error occurred while deleting event."
            });
        }
        res.send(data);
    })
}