import mysql from "mysql"
import dbConfig from "../config/db.config.js";

// const connection = mysql.createConnection({
//     host: dbConfig.host,
//     port: dbConfig.port,
//     user: dbConfig.user,
//     password: dbConfig.password,
//     database: dbConfig.database

// });


const sql = () => {
    const development = dbConfig.development;
    
    const connection = mysql.createConnection({
        host: development.host,
        port: development.port,
        user: development.user,
        password: development.password,
        database: development.database
    
    });
    
    connection.connect(function(err) {
        if (err) {
            // console.log("errr");
            // throw err;
        }
        console.log("Data Connected!");
        connection.end();
    });
    
    let queryState = "SELECT * from User where passWords= \'Drake21\'";
    let data;
    const infor = connection.query(queryState, function (error, results, fields) {
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
}

export default sql;