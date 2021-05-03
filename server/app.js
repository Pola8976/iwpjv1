const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const router = require('./routes');

const app = express();
const port = 3000;

// var conn = mysql.createConnection({
//   user: 'appaccess',
//   password: 'angexp',
//   database: 'test',
//   host: 'localhost',
//   port: 3306
// })

// conn.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// conn.query('SELECT 1+2 AS solution FROM DUAL', function (err, rows, fields) {
//   if (err) throw err;


app.use(cors());
// app.use(express.urlencoded());
app.use(express.json());

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})