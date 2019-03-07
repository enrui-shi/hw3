var express = require('express');
var amqp = require('amqplib/callback_api');
var bodyParser = require('body-parser');
var router = express.Router();
const path = require('path');

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/',jsonParser,function(req,res){
    data = req.body;
    msg = data.msg;
    key = data.key;
    amqp.connect('amqp://localhost', function(err, conn) {
        conn.createChannel(function(err, ch) {
            ch.publish('hw3', key, new Buffer(msg));
            console.log(msg+" send to "+key);

            //res.send(msg+" send to "+key);
        });
    });
});

//export this router to use in our index.js
module.exports = router;