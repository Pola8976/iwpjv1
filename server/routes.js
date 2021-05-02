const express = require('express');
const router = express.Router();
const mysql = require('mysql');

var conn = mysql.createConnection({
    user: 'appaccess',
    password: 'angexp',
    database: 'iwpjv1',
    host: 'localhost',
    port: 3306
  })
  
  conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

// router.get('/test', (req, res, next) => {
//     conn.query('SELECT id, someattri FROM test', function (err, rows, fields) {
//         if (err)
//             res.json(err);
//         else
//             res.json(rows);
//       });
// });

router.post('/new-customer', (req, res, next) => {
    console.log(req.body.address.house)
    with(req.body) {
        var insArr = [passwords.pass, phone, email, age, sex];
        with(address) {
            insArr.push(house, area, landmark, city, state, pin);
        }
    }
    console.log(insArr);
    var sql = 'INSERT INTO dupliCustomers (passhash, phone, email, age, sex, house, area, landmark, city, state, pin) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
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

module.exports = router;