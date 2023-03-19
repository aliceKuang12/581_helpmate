/**
 * imageController.js 
 *
 * Image class storing filename of user uploaded photos 
 *
 * @author Alice Kuang
 * @since  3/17/23
 */

import sql from "./db.js";

const Images = function(image) {
    this.userId = image.userId;
    this.profile1 = image.profile1;
    this.social1 = image.social1;
    this.social2 = image.social2;
    this.social3 = image.social3;
    this.travel1 = image.travel1;
    this.travel2 = image.travel2;
    this.travel3 = image.travel3;
}

Images.create = (newEvent, result) => {
    let query = "INSERT INTO imagerefs SET ?"
    sql.query(query, newEvent, (err, res) => {
        if (err) {
            result(err,null);
            return;
        }
        result(null, res);
    })
}

// return image events based on userId
Images.getOne  = (email, result) => {
    let query = "SELECT * FROM imagerefs where userId = (SELECT id from users where email = ?)";
    sql.query(query, [email], (err, res) => {
        if (err) {
            console.log("Cannot retrieve user's image info: ", err);
            result(err,null);
        } else {
            console.log("User: ", res);
            result(null,res);
        }
    })
}

// return image events based on userId field
Images.getOne1  = (email, result) => {
    let query = "SELECT profile1 FROM imagerefs where userId = (SELECT id from users where email = ?)";
    sql.query(query, [email], (err, res) => {
        if (err) {
            console.log("Cannot retrieve user's image info: ", err);
            result(err,null);
        } else {
            console.log("User: ", res);
            result(null,res);
        }
    })
}

// return entire table
Images.show = (user_id, result) => {
    let query = `SELECT * from imagerefs`;
    sql.query(query, [user_id], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    })
}

// update profilePic
// Transactions w/ multiple params: https://nicholasmordecai.co.uk/database/transactions-with-multiple-queries-nodejs-mysql/
Images.update1 = (req, result) => {
    const filePath = req.file.filename;
    const email = req.params.email;

    let query = `UPDATE imagerefs SET profile1=? WHERE userId = (SELECT id from users where email = ?)`; 
    sql.query(query, [filePath, email], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
       
        console.log(filePath); 
        result(null, res);
    })
}

// update social, saving relative paths of 3 photos
Images.update2 = (req, result) => {
    const fp = req.files; // array of files
    const email = req.params.email;
    console.log(fp)

    let query = `UPDATE imagerefs SET social1=?, social2=?, social3=? WHERE userId = (SELECT id from users where email = ?)`; 
    sql.query(query, [fp[0].filename, fp[1].filename, fp[2].filename, email], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
       
        console.log(fp);
        result(null, res);
    })
}

// update travel, saving relative paths of 3 photos
Images.update3 = (req, result) => {
    const fp = req.files; // array of files
    const email = req.params.email;
    console.log(fp)

    let query = `UPDATE imagerefs SET travel1=?, travel2=?, travel3=? WHERE userId = (SELECT id from users where email = ?)`; 
    sql.query(query, [fp[0].filename, fp[1].filename, fp[2].filename, email], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
       // result(null, filePath);
        console.log(fp);
    })
}

export default Images;