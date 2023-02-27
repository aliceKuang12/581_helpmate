/**
 * Author: Alice Kuang
 * Update Date: 2/25/23
 * Creation Date: 2/20/23
 * Description: Intermediary controller for health event creation and retreival; 
 *      get all users health or specific categories (i.e. steps and activities)
 */

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

// query by email
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

// get steps, query by email 
export const userSteps = (req, res) => {
    const email = req.params.email;
    // const cat = req.params.category;
    Health.getOne1(email, (err, data) => {
        if (err) {
            return res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving health for user."
            });
        }
        
        res.send(data);
    });
}

// get activity, query by email 
export const userActivity = (req, res) => {
    const email = req.params.email;
    // const cat = req.params.category;
    Health.getOne2(email, (err, data) => {
        if (err) {
            return res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving health for user."
            });
        }
        
        res.send(data);
    });
}

// get category, query by email and category
// export const userSteps1 = (req, res) => {
//     console.log(req.params.email)
//     console.log(req.params.category)
//     const email = req.params.email;
//     const category = req.params.category;
//     Health.getOne11(category, email, (err, data) => {
//         if (err) {
//             return res.status(500).send({
//                 message:
//                     err.message || "Error occurred while retrieving health for user."
//             });
//         }
        
//         res.send(data);
//     });
// }

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