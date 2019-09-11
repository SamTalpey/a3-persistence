const express = require('express'),
    server = express(),
    bodyparser = require('body-parser'),
    dataStore = [];

// Deliver all files to public folder
server.use(express.static('public'));

// Get JSON when relevant
server.use(bodyparser.json());

// Explicity handle domain name
server.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
})

server.post('/submit', function(req, res) {
  // TODO push here?
  response.writeHead(200, {'Content-Type': 'application/json'});
  response.end(JSON.stringify(request.json));
})

//server.use(function(req, res, next) {
//  console.log('url:', req.url);
//  let dataString = '';
//
//  request.on('data', function(data) {
//    dataString += data;
//  })
//
//  request.on('end', function() {
//    const json = JSON.parse(dataString);
//    dataStore.push(json);
//    request.json = JSON.stringify(dataStore);
//    next();
//  })
//})

server.listen(process.env.PORT);
