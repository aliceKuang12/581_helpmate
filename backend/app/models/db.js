
import mysql2 from "mysql2";
import dbConfig from "../config/db.config.js";

const development = dbConfig.development;

const sql = mysql2.createConnection({
    host: development.host,
    user: development.user,
    password: development.password,
    database: development.database
});

export default sql; 
