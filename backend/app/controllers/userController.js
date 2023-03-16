import User from "../models/user.js";
// const User = require("../models/user.js");
import bcrypt from 'bcrypt';
import sql from "../models/db.js";
import session from "express-session"

const hashPassword = (password) => {
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    return hashedPassword;
}

const checkPassword = (password, User) => {
    const match = bcrypt.compareSync(password, User.password);
    return match;
}

export const createUser = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty"
        })
    }
    
    const newUser = new User({
        token: req.body.token,
        username: req.body.username,
        password: hashPassword(req.body.password),
        email: req.body.email,
        cell: req.body.cell,
        fname: req.body.fname,
        lname: req.body.lname,
        birthday: req.body.birthday,
        profilePic: req.body.profilePic,
        address: req.body.address
    })

    User.create(newUser, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error has occured while creating new user"
            })
        } else {
            res.send(data);
            console.log(newUser);
        }
    })
};

export const login = (req, res, next) => {
    if (!req.query) {
        res.status(400).send({
            message: "Content cannot be empty"
        })
    }

    const email = req.query.email;
    const password = req.query.password;

    if (email && password) {
        let query = `SELECT * FROM users WHERE email = (?)`;
        sql.query(query, [[email]], (err, data) => {
            if (err) {
                return res.status(500).send({message: err.message || "Some error occurred while logging in."})
            }
            if (res.length == 0) {
                return res.status(401).send({message: "Incorrect email address!"});
            } else {
                console.log(data);
                if (checkPassword(password, data[0])) {
                    req.session.regenerate(function (err) {
                        if (err) next(err)
                        req.session.user = data[0];
                        req.session.save(function (err) {
                            if (err) return next(err);
                            return res.status(200).json(req.session.user);
                        })
                    })
                } else {
                    return res.status(401).send({message: "Incorrect password"});
                }
            }
        })
    }
    
}


export const findOne = (req, res) => {
    const email = req.params.email;
    User.getOne(email, (err, data) => {
        if (err) {
            return res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving `findone` user."
            });
        }
        
        res.send(data);
    });
}

export const findAll = (req, res) => {  
    User.getAll((err, data) => {
        if (err) {
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        }
        
        res.send(data);
    });
};