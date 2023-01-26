
import mysql from "mysql";
import dbConfig from "../config/db.config.js";

const development = dbConfig.development;

const connection = mysql.createConnection({
    host: development.host,
    // port: development.port,
    user: development.user,
    password: development.password,
    database: development.database
});

connection.connect(function(err) {
    if (err) {
        console.log(`errrr ${err}`)
        throw err;
    }
    console.log("Data Connected!");
    connection.end();
});

let queryState = "SELECT * from Users where password= \'Drake21\'";
let data;
const infor = connection.query(queryState, function (error, results, fields) {
    if (error) {
        connection.destroy();
        throw error;
    } else {
        data = JSON.parse(JSON.stringify(results))
        console.log(data);
        return data;
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

export default infor;
