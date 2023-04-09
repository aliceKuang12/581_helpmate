import Travel from "../models/travel.js"

export const createEvent = (req, res) => {
    const newEvent = new Travel({
        userId: req.body.userId,
        title: req.body.title,
        category: req.body.category,
        eventTime: req.body.date,
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

export const userTravel = (req, res) => {
    const email = req.params.email;
    Travel.getOne(email, (err, data) => {
        if (err) {
            return res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving `findone` user."
            });
        }
        
        res.send(data);
    });
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

export const deleteEvent = (req,res) => {
    const travel_data = req.body.data;
    //const title = req.body.data.title
    //console.log(title);
    console.log("Travel Data: ", travel_data)
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