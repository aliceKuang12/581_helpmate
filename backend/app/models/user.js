import sql from "./db.js";

const User = function(user) {
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
        console.log("Created customer: ", res);
        result(null, res);
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


export default User;