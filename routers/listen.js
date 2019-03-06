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
    keys = data.keys;
    keys.forEach(function(e){
        console.log(e);
    });

    amqp.connect('amqp://localhost', function(err, conn) {
        conn.createChannel(function(err, ch) {
            ch.assertQueue('', {exclusive: true}, function(err, q) {
                console.log("waiting for massage comming in:")

                //ch.bindQueue(q.queue, 'hw3', );
            });
        });
    });

});

//export this router to use in our index.js
module.exports = router;