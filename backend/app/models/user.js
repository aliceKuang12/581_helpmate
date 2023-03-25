import { query } from "express";
import sql from "./db.js";

const User = function(user) {
    this.token = user.token;
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.cell = user.cell;
    this.fname = user.fname;
    this.lname = user.lname;
    this.birthday = user.birthday;
    this.profilePic = user.profilePic;
    this.address = user.address;
}

User.create = (newUser, result) => {
    let query = "INSERT INTO users SET ?"
    sql.query(query, newUser, (err, res)=> {
        if (err) {
            console.log("Failed to create new user: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    })
}

User.update = (updated, id, result) => {
    let query = `UPDATE users SET ? WHERE id = ${id}`;
    sql.query(query, updated, (err, res) => {
        if (err) {
            console.log("Cannot update: ", err);
            result(err,null);
        } else {
            console.log("All users: ", res);
            result(null,res);
        }
    })
}


User.update2 = (req, result) => {
    const updated = req.body;
    const id = req.body.id;
    let query = `UPDATE users SET ? WHERE id = ?`;
    sql.query(query, [updated, id], (err, res) => {
        if (err) {
            console.log("Cannot update: ", err);
            result(err,null);
        } else {
            console.log("All users: ", res);
            result(null,res);
        }
    })
}

User.getAll = (result) => {
    let query = "SELECT * FROM users";
    sql.query(query, (err, res) => {
        if (err) {
            console.log("Cannot retrieve all users: ", err);
            result(err,null);
        } else {
            console.log("All users: ", res);
            result(null,res);
        }
    })
}

User.getOne  = (email, result) => {
    let query = "SELECT * FROM users where email = ?";
    sql.query(query, [email], (err, res) => {
        if (err) {
            console.log("Cannot retrieve user with email: ", err);
            result(err,null);
        } else {
            console.log("User: ", res);
            result(null,res);
        }
    })
}

export default User;