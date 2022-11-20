const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

const connection = mysql.createConnection({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database

});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Data Connected!");
    connection.end();
});

let queryState = "SELECT * from User where passWords= \'Drake21\'";
let data;
exports.infor = connection.query(queryState, function (error, results, fields) {
    if (error) {
        connection.destroy();
        throw error;
    } else {
        // connected!
        
        data = JSON.parse(JSON.stringify(results))
        console.log(data);
        return data;
        // return data;
        
        // callback(error, results);
        // connection.end(function (err) { callback(err, results); });
    }
});



// exports.handler = (event, context, callback) => {

//     connection.query('show tables', function (error, results, fields) {
//         if (error) {
//             connection.destroy();
//             throw error;
//         } else {
//             // connected!
//             console.log(results);
//             callback(error, results);
//             connection.end(function (err) { callback(err, results); });
//         }
//     });
// };

// exports.infor=data;