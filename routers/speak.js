var express = require('express');
var amqp = require('amqplib/callback_api');
var bodyParser = require('body-parser');
var router = express.Router();
const path = require('path');

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })



//export this router to use in our index.js
module.exports = router;