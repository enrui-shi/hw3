const express = require('express');
const amqp = require('amqplib/callback_api');
const app = express();
const path = require('path');
const port = 3000;

//routes
var listen = require('./routers/listen.js');
var speak = require('./routers/speak.js');

//add api
//app.use('/listen', listen);
app.use('/speak', speak);
amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    ch.assertExchange('hw3', 'direct', {durable: false});
    console.log("success assert exchange hw3");
  });
  //setTimeout(function() { conn.close(); process.exit(0) }, 500);
});
app.listen(port,'0.0.0.0', () => {
    return console.log(`App listening on port ${port}!`);
})