const express = require('express');
const router = express.Router();
const mysql = require('mysql');

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
        var insArr = [fullName, passwords.pass, phone, email, sex];
        with(address) {
            insArr.push(house, area, landmark, city, state, pin);
        }
    }
    insArr.push(req.body.dob.slice(0,req.body.dob.indexOf('T')));
    console.log(insArr);
    var sql = 'INSERT INTO duplicustomers (name, passhash, phone, email, sex, house, area, landmark, city, state, pin, dob) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
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
    with(req.body)
        var insArr = [email, pass];
    console.log(insArr);
    var sql = 'SELECT cid, name FROM duplicustomers WHERE email = ? AND passhash = ?';
    conn.query(sql, insArr, function (err, rows, fields) {
        if (err) {
            var reply = { result: "error", code: err.code, msg: err.sqlMessage };
            res.json(reply);
            console.log(err);
        }
        else {
            if(!rows.length)
                var reply = { result: "empty" };
            else {
                var reply = { result: "success", cname: rows[0].name };
                cid = rows[0].cid;
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