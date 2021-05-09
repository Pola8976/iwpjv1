const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

setInterval(function() {
    console.log(jwt.sign({id: 1}, process.env.TOKEN_SECRET, { expiresIn: '1800s' }))
}, 60);
