const express = require('express');
const router = express.Router();
const mysql = require('mysql');

var conn = mysql.createConnection({
    user: 'appaccess',
    password: 'angexp',
    database: 'test',
    host: 'localhost',
    port: 3306
  })
  
  conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

router.get('/test', (req, res, next) => {
    conn.query('SELECT id, someattri FROM test', function (err, rows, fields) {
        if (err)
            res.json(err);
        else
            res.json(rows);
      });
});

router.post('/new-customer', (req, res, next) => {
    console.log(req.body)
    /* sql = 'INSERT INTO dupliCustomers (passhash, phone, email, age, sex, house, area, landmark, city, state, pin) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
    conn.query(sql, res.body.fields, function (err, result) {
      if (err)
          res.json(err);
      else
          res.json(result);
    });
    */
}); 

module.exports = router;