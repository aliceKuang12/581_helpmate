import Social from "../models/social.js"

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

export const deleteEvent = (req,res) => {
    const title = req.body.data.title
    console.log(title);
    Social.delete(title, (err,data) => {
        if(err) {
            return res.status(500).send({
                message:
                    err.message || "Error occurred while deleting event."
            });
        }
        res.send(data);
    })
}