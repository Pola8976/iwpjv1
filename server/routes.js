const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");

var conn = mysql.createConnection({
    user: 'appaccess',
    password: 'angexp',
    database: 'iwpjv1',
    host: 'localhost',
    port: 3306
});
  
conn.connect(function(err) {
    if (err) throw err;
console.log("Connected!");
});


var cid = -1;

// router.get('/test', (req, res, next) => {
//     conn.query('SELECT id, someattri FROM test', function (err, rows, fields) {
//         if (err)
//             res.json(err);
//         else
//             res.json(rows);
//       });
// });

router.post('/signup', (req, res, next) => {
    with(req.body) {
        var insArr = [fullName, phone, email, sex];
        with(address) {
            insArr.push(house, area, landmark, city, state, pin);
        }
    }
    insArr.push(req.body.dob.slice(0,req.body.dob.indexOf('T')));
    insArr.push(bcrypt.hashSync(req.body.passwords.pass, 10));
    console.log(insArr);
    var sql = 'INSERT INTO duplicustomers (name, phone, email, sex, house, area, landmark, city, state, pin, dob, passhash) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
    conn.query(sql, insArr, function (err, result) {
        if (err) {
            var reply = { result: "error", code: err.code, msg: err.sqlMessage };
            res.json(reply);
            console.log(err);
        }
        else {
            var reply = { result: "success" };
            res.json(reply);
            console.log(result);
        }
    });
    
});

router.post('/login', (req, res, next) => {
    var sql = 'SELECT cid, name, passhash FROM duplicustomers WHERE email = ?';
    conn.query(sql, [req.body.email], function (err, rows, fields) {
        if (err) {
            var reply = { result: "error", code: err.code, msg: err.sqlMessage };
            res.json(reply);
            console.log(err);
        }
        else {
            if(!rows.length)
                var reply = { result: "empty" };
            else if(rows.length == 1) {
                if(bcrypt.compareSync(req.body.pass, rows[0].passhash)) {
                    var reply = { result: "success", cname: rows[0].name };
                    cid = rows[0].cid;
                }
                else
                    var reply = { result: "empty" };
            }
            res.json(reply);
            console.log(rows);
            console.log(cid);
        }
    });
    
});

router.get('/logout', (req, res, next) => {
    cid = -1;
    var reply = {result: "success"};
    res.json(reply);
});

module.exports = router;