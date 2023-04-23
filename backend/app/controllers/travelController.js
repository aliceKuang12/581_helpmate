import Travel from "../models/travel.js"
import sql from "../models/db.js";

export const createEvent = (req, res) => {
    const newEvent = new Travel({
        userId: req.body.userId,
        title: req.body.title,
        category: req.body.category,
        eventTime: req.body.date + " " + req.body.time,
        location: req.body.address,
        notes: req.body.notes,
        ticket: req.body.ticket,
        completed: req.body.completed,
    })
    Travel.create(newEvent, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "An error has occured while creating a new Academic event"
            })
        }
        return res.status(200).send(data);
    })
}

export const showTravel = (req, res) => {
    Travel.show(req.query.user_id, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving academic events."
            })
        }
        res.status(200).send(data);
    })
}

// update user info on profile page
export const updateTravel = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty"
        })
    }

    let user_id = req.body.userId;
    let query = "SELECT * FROM travel where userId = ?";
    sql.query(query, [user_id], (err, result) => {
        if (err) {
            console.log("Unable to find events with id ", user_id)
        } else {
            const updated = req.body;
            Travel.update(updated, user_id, (err, data) => {
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
    const travel_data = req.body.data;
    //console.log("Travel Data: ", travel_data)
    Travel.delete(travel_data, (err,data) => {
        if(err) {
            return res.status(500).send({
                message:
                    err.message || "Error occurred while deleting event."
            });
        }
        res.send(data);
    })
}