import Travel from "../models/travel.js"

export const createEvent = (req, res) => {
    const newEvent = new Travel({
        userId: req.query.userId,
        title: req.query.title,
        category: req.query.category,
        eventTime: req.query.eventTime,
        location: req.query.location,
        notes: req.query.notes,
        ticket: req.query.ticket,
        completed: req.query.completed,
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
    if (!req.params) {
        return res.status(400).send({
            message: "Content cannot be empty"
        })
    }
    Travel.show(req.params.user_id, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving academic events."
            })
        }
        res.status(200).send(data);
    })
}