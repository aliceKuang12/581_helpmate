import session from "express-session"
import express from "express";
import * as user from "../controllers/userController.js";
import app from "../../server.js"

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.post("/users", (req, res) => user.createUser(req, res));

app.get("/users", user.findAll);

app.post("/login", express.urlencoded({extended: false}), (req, res, next) => user.login(req, res, next));

app.get("/logout", (req, res, next) => {
    req.session.user = null;
    req.session.save(function (err) {
        if (err) next(err)
        req.session.regenerate(function (err) {
            if (err) next(err)
            res.redirect('/')
        })
    })
})