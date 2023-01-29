import User from "../models/user.js";
import bcrypt from 'bcrypt';

const hashPassword = (password) => {
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    return hashedPassword;
}

// const checkPassword = (password, User) => {
//     const match = bcrypt.compareSync(password, User.password);
// }

export const createUser = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty"
        })
    }
    
    const newUser = new User({
        token: req.query.token,
        username: req.query.username,
        password: hashPassword(req.query.password),
        email: req.query.email,
        cell: req.query.cell,
        fname: req.query.fname,
        lname: req.query.lname,
        birthday: req.query.birthday,
        profilePic: req.query.profilePic,
        address: req.query.address
    })

    User.create(newUser, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error has occured"
            })
        } else {
            res.send(data);
            console.log(newUser);
        }
    })
};

export const findAll = (req, res) => {  
    User.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      else res.send(data);
    });
};