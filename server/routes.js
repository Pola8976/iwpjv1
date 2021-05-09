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

conn.connect(function(err) {
    if (err) throw err;
console.log("Connected!");
});

function genAuthToken(idt) {
    return jwt.sign(idt, process.env.TOKEN_SECRET, { expiresIn: '3h' });
}

function verifyAuthToken(req, res, next) {
    console.log(`authHeader: ${req.headers.authorization}`);
    if(!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }

    var token = req.headers.authorization.split(' ')[1];
    console.log(`token: ${token}`);
    if(token === null) {
        return res.status(401).send('Unauthorized request');
    }

    var payload = jwt.verify(token, process.env.TOKEN_SECRET);
    if(!payload) {
        return res.status(401).send('Unauthorized request');
    }
    req.id = payload.id;
    console.log(`payload: ${payload}`);
    next();
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
        }
    });
    
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

router.post('/seller/login', (req, res) => {
    var sql = 'SELECT id, name_owner, name_business, passhash FROM sellers WHERE email = ?';
    conn.query(sql, [req.body.email], function (err, rows) {
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
                    var reply = { result: "success", name: rows[0].name_owner, business: rows[0].name_business, authToken: token };
                }

                else
                    var reply = { result: "empty" };
            }
            res.json(reply);
            console.log(rows);
        }
    });
    
});

router.get('/categories', (req, res) => {
    var sql = "SELECT id, name from categories WHERE id NOT LIKE '%0' ORDER BY id";
    conn.query(sql, function (err, rows) {
        if (err) {
            var reply = { result: "error", code: err.code, msg: err.sqlMessage };
            res.status(500).json(reply);
            console.log(err);
        }
        else {
            // resArr = []
            // rows.forEach(row => {
            //     resArr.push(row.name);
            // });

            var reply = { result: "success", rows: rows};
            res.status(200).json(reply);
            // console.log(rows);
        }
    });
    
});

router.post('/seller/create', verifyAuthToken, (req, res) => {
    insArr = [req.id];
    with(req.body)
        insArr.push(category, prodName, price, stock, description);
    console.log(insArr);
    var sql = 'INSERT INTO products (sid, catid, name, price, stock, description) VALUES (?,?,?,?,?,?)';
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

router.post('/seller/products', verifyAuthToken, (req, res) => {
    var sql = `SELECT products.id AS id, categories.name AS catName, products.name AS prodName, price, stock, sold`
    if(!req.body.allProducts)
        sql += `, description`;
    sql += ` FROM products LEFT JOIN categories ON products.catid = categories.id`;
    if(!req.body.allProducts)
        sql += ` WHERE products.id = ${req.body.pid}`;
    sql += ` ORDER BY id`;
    conn.query(sql, function (err, rows) {
        if (err) {
            var reply = { result: "error", code: err.code, msg: err.sqlMessage };
            res.status(500).json(reply);
            console.log(err);
        }
        else {
            // resArr = []
            // rows.forEach(row => {
            //     resArr.push(row.name);
            // });

            var reply = { result: "success", rows: rows};
            res.status(200).json(reply);
            // console.log(rows);
        }
    });
    
});

module.exports = router;