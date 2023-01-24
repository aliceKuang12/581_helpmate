const dbConfig = {
  development: {
    host: "localhost",
    port:"3306",
    user: "root",
    password: null,
    database:"helpMate"
  },
  production: {
    host: "database-1.cdronrai97vl.us-east-1.rds.amazonaws.com",
    port:"3306",
    user: "helpMate",
    password: "Thai21200126.",
    database:"helpMate"
  }
};

export default dbConfig;