const mysql = require('mysql');

const con = mysql.createConnection({
    host: "database-3.cdronrai97vl.us-east-1.rds.amazonaws.com",
    port:"3306",
    user: "helpMate",
    password: "Thong21200126.",
    database:"helpMate_test"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.end();
});