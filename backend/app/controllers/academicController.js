import Academic from "../models/academic.js";

export const createEvent = (req, res) => {
    const newEvent = new Academic({
        userId: req.query.userId,
        title: req.query.title,
        category: req.query.category,
        eventTime: req.query.eventTime,
        location: req.query.location,
        notes: req.query.notes,
        completed: req.query.completed,
    })
    Academic.create(newEvent, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "An error has occured while creating a new Academic event"
            })
        }
        return res.status(200).send(data);
    })
}

export const showAcademic = (req, res) => {
    if (!req.params) {
        return res.status(400).send({
            message: "Content cannot be empty"
        })
    }
    Academic.show(req.params.userId, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving academic events."
            })
        }
        res.status(200).send(data);
    })
}
