const expr = require('express');
const db = require('mysql');
const cors = require('cors');
var connection = require('./connect');

const inst = expr();
inst.use(cors());
inst.use(expr.json());

inst.post('/signup', (req, res) => {
    const myQuery = "INSERT INTO `details` (`username`, `emailid`, `password`, `typeofuser`) VALUES (?);";
    const values = [
        req.body.username,
        req.body.emailid,
        req.body.password,
        req.body.typeofuser
    ];
    console.log(req.body);
    connection.query(myQuery, [values], (err, data) => {
        if (err) {
            console.log(err);
            if (err.code == 'ER_DUP_ENTRY') {
                return res.json("Already Exists");
            }
            return res.json("Failed");
        }
        return res.json(data);
    });
});

inst.post('/login', (req, res) => {
    const myQuery = "SELECT * FROM `details` WHERE `emailid`=? AND `password`=?;";
    connection.query(myQuery, [req.body.emailid, req.body.password], (err, data) => {
        if (err) {
            return res.json(err.code);
        } else if (data.length > 0) {
            return res.json(data[0].typeofuser);
        } else {
            return res.json("Failed to login");
        }
    });
});

inst.listen(8081, () => {
    console.log("Listening on port 8081");
    connection.connect(function (err) {
        if (err) throw err;
        console.log("Database connected successfully");
    });
});
