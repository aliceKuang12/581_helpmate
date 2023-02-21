import Health from "../models/health.js"

export const createEvent = (req, res) => {
    const newEvent = new Health({
        userId: req.query.userId,
        title: req.query.title,
        category: req.query.category,
        eventTime: req.query.eventTime,
        location: req.query.location,
        notes: req.query.notes,
        completed: req.query.completed,
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

export const userHealth = (req, res) => {
    const email = req.params.email;
    Health.getOne(email, (err, data) => {
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
    if (!req.params) {
        return res.status(400).send({
            message: "Content cannot be empty"
        })
    }
    Health.show(req.params.user_id, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving heatlh events."
            })
        }
        res.status(200).send(data);
    })
}