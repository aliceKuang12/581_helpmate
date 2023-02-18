import Social from "../models/social.js"

export const createEvent = (req, res) => {
    const newEvent = new Social({
        userId: req.query.userId,
        title: req.query.title,
        category: req.query.category,
        eventTime: req.query.eventTime,
        location: req.query.location,
        notes: req.query.notes,
        photo: req.query.photo,
        completed: req.query.completed,
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

export const userSocial = (req, res) => {
    const email = req.params.email;
    Social.getOne(email, (err, data) => {
        if (err) {
            return res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving socials for user."
            });
        }
        
        res.send(data);
    });
}

export const showSocial = (req, res) => {
    if (!req.params) {
        return res.status(400).send({
            message: "Content cannot be empty"
        })
    }
    Social.show(req.params.user_id, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving social events."
            })
        }
        res.status(200).send(data);
    })
}