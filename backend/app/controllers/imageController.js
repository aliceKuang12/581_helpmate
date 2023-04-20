/**
 * imageController.js 
 *
 * Controller to store photo urls 
 *
 * @author Alice Kuang
 * @since  3/17/23
 */

import Images from "../models/image.js";

// create method for image references
export const createRefs = (req, res) => {
    const newRefs = new Images({
        userId: req.body.userId,
        profile1: req.body.profile1,
        social1: req.body.social1,
        social2: req.body.social2,
        social3: req.body.social3,
        travel1: req.body.travel1,
        travel2: req.body.travel2,
        travel3: req.body.travel3,
    })
    Images.create(newRefs, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                message: err.message || "An error has occured while creating a new Images event"
            })
        }
        return res.status(200).send(data);
    })
}


// show paths where images are stored
export const showImageRefs = (req, res) => {
    if (!req.params) {
        return res.status(400).send({
            message: "Content cannot be empty"
        })
    }
    Images.show(req.params.userId, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving image paths."
            })
        }
        res.status(200).send(data);
    })
}

// show paths where images are stored
export const updateProfileRefs = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty"
        })
    }

    console.log(req.body);
    Images.updateProfile(req, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving image paths."
            })
        }
        res.status(200).send(data);
    })
}

// show image paths for a given user
export const profileRefs = (req, res) => {
    Images.profileUrl(req.query.user_id, (err, data) => {
        if (err) {
            return res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving user's image paths."
            });
        }

        res.send(data);
    });
}

// show paths where images are stored
export const socialRefs = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty"
        })
    }

    Images.getSocials(req.query.user_id, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving image paths."
            })
        }
        res.status(200).send(data);
    })
}

// show paths where images are stored
export const travelRefs = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty"
        })
    }

    Images.getTravels(req.query.user_id, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving image paths."
            })
        }
        res.status(200).send(data);
    })
}


// show paths where images are stored
export const updateSocialRefs = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty"
        })
    }

    Images.updateSocials(req, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving image paths."
            })
        }
        res.status(200).send(data);
    })
}

// show paths where images are stored
export const updateTravelRefs = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty"
        })
    }

    Images.updateTravels(req, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving image paths."
            })
        }
        res.status(200).send(data);
    })
}




