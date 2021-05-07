const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

var conn = mysql.createConnection({
    user: 'appaccess',
    password: 'angexp',
    database: 'iwpjv1',
    host: 'localhost',
    port: 3306
});
  
var cid = -1;

conn.connect(function(err) {
    if (err) throw err;
console.log("Connected!");
});

function genAuthToken(idt) {
    return jwt.sign(idt, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

router.post('/signup', (req, res) => {
    with(req.body) {
        var insArr = [fullName, email, sex];
        if(phone === '')
            insArr.push(null);
        else
            insArr.push(phone);
        insArr.push(dob.slice(0,dob.indexOf('T')));
        insArr.push(bcrypt.hashSync(passwords.pass, 10));
        with(address) {
            insArr.push(house, area, landmark, city, state, pin);
        }
    }
    console.log(insArr);
    var sql = 'INSERT INTO customers (name, email, sex, phone, dob, passhash, house, area, landmark, city, state, pin) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
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

router.post('/login', (req, res) => {
    var sql = 'SELECT id, name, passhash FROM customers WHERE email = ?';
    conn.query(sql, [req.body.email], function (err, rows, fields) {
        if (err) {
            var reply = { result: "error", code: err.code, msg: err.sqlMessage };
            res.json(reply);
            console.log(err);
        }

        else {
            if(!rows.length)
                var reply = { result: "empty" };

            else {
                if(bcrypt.compareSync(req.body.pass, rows[0].passhash)) {
                    const token = genAuthToken({ id: rows[0].id });
                    var reply = { result: "success", name: rows[0].name, authToken: token };
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

router.get('/logout', (req, res) => {
    cid = -1;
    var reply = {result: "success"};
    res.json(reply);
});

router.post('/seller/signup', (req, res) => {
    with(req.body) {
        var insArr = [ownName, phone, email, sex, busName, gstin];
        with(address) {
            insArr.push(shop, area, landmark, city, state, pin);
        }
    }
    insArr.push(req.body.dob.slice(0,req.body.dob.indexOf('T')));
    insArr.push(bcrypt.hashSync(req.body.passwords.pass, 10));
    console.log(insArr);
    var sql = 'INSERT INTO sellers (name_owner, phone, email, sex, name_business, gstin, shop, area, landmark, city, state, pin, dob, passhash) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
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