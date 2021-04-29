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

module.exports = router;