const express = require('express'),
    server = express(),
    bodyparser = require('body-parser'),
    dir = '/public/',
    low = require('lowdb'),
    FileSync = require('lowdb/adapters/FileSync'),
    adapter = new FileSync('db.json'),
    db = low(adapter);

// Setting defaults for empty JSON file
db.defaults({ posts: [], user: {}, count: 0})
  .write()

// Handling posts
db.get('posts')
  // TODO Add the actual data
  .push({id: 1, title: 'lowdb works'})
  .write()

// Deliver all files to public folder
// TODO this doesnt actually seem to do anything
server.use(express.static('public'));

// Get JSON when relevant
server.use(bodyparser.json());

// Explicity handle domain name
server.get('/', function(req, res) {
  res.sendFile(__dirname + dir + '/views/index.html');
})

server.post('/submit', function(req, res) {
  // TODO push here?
  response.writeHead(200, {'Content-Type': 'application/json'});
  response.end(JSON.stringify(request.json));
})

server.listen(process.env.PORT || 3000);
