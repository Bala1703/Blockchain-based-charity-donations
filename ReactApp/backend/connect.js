var db = require('mysql');

var connection = db.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "blockchain"
});

module.exports = connection;
