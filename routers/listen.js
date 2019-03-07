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

    amqp.connect('amqp://localhost', function(err, conn) {
        conn.createChannel(function(err, ch) {
            ch.assertQueue('', {exclusive: true}, function(err, q) {
                console.log("waiting for massage comming in:")
                keys.forEach(function(e){
                    ch.bindQueue(q.queue, 'hw3', e);
                });
                //wait for massage
                ch.consume(q.queue, function(msg) {
                    console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
                    res.json({"msg":msg.content.toString()});
                  });
            });
        });
    });

});

//export this router to use in our index.js
module.exports = router;