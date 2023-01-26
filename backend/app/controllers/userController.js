import User from "../models/user.js";

export const createUser = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty"
        })
    }
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
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
                message: err.message || "An error has occured"
            })
        } else {
            res.send(data);
        }
    })
};

export const findAll = (res) => {  
    User.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      else res.send(data);
    });
};

const test = {
    body: {
        username: "Test1",
        password: "1234",
        email: "test1@gmail.com",
        cell: "",
        fname: "Test1",
        lname: "User",
        birthday: new Date(1995, 11, 17),
        profilePic: "",
        address: ""
    }
}
const res = ""

createUser(test, res);
// findAll(res);