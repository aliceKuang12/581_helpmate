import session from "express-session"
import express from "express";
import * as user from "../controllers/userController.js";
import * as academic from "../controllers/academicController.js";
import * as travel from "../controllers/travelController.js";
import app from "../../server.js"

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

//session
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

//user
app.post("/signup", (req, res) => user.createUser(req, res));

app.get("/users", user.findAll);

//academic module
app.post("/academics/create", (req, res) => academic.createEvent(req,res));
app.get("/academics", (req, res) => academic.showAcademic(req, res));

//travel module
app.post("/travel/create", (req, res) => travel.createEvent(req,res));
app.get("/travel", (req, res) => travel.showTravel(req, res));

