/**
 * imageController.js 
 *
 * Controller to store relative paths of user uploaded photos 
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

// show image paths for a given user
export const userImageRefs = (req, res) => {
    const email = req.params.email;
    Images.getOne(email, (err, data) => {
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
    if (!req.params) {
        return res.status(400).send({
            message: "Content cannot be empty"
        })
    }
    
   // console.log(req.file.path, '\n', req.body)
    Images.update1(req, (err, data) => {
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
    const email = req.params.email;
    Images.getOne1(email, (err, data) => {
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
export const updateSocialRefs = (req, res) => {
    if (!req.params) {
        return res.status(400).send({
            message: "Content cannot be empty"
        })
    }
    
   console.log(req) // req.file, req.body
    Images.update2(req, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving image paths."
            })
        }
        res.status(200).send(data);
    })
}

// // show paths where images are stored
// export const updateTravelRefs = (req, res) => {
//     if (!req.params) {
//         return res.status(400).send({
//             message: "Content cannot be empty"
//         })
//     }
    
//    // console.log(req.file.path, '\n', req.body)
//     Images.update3(req, (err, data) => {
//         if (err) {
//             return res.status(500).send({
//                 message: err.message || "Some error occurred while retrieving image paths."
//             })
//         }
//         res.status(200).send(data);
//     })
// }




