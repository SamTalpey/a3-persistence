const express = require('express'),
    server = express(),
    bodyparser = require('body-parser'),
    low = require('lowdb'),
    FileSync = require('lowdb/adapters/FileSync'),
    adapter = new FileSync('db.json'),
    db = low(adapter);

const jobList = [
  {'name': 'test', 'job': 'Knobs + Rags', 'day': 'Tuesday"'}
]

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
server.use(express.static('public/'));

// Get JSON when relevant
server.use(bodyparser.json());

// Explicity handle domain name
server.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
})

server.post('/', function(req, res) {
  // TODO push here?
  console.log('POST request to homepage');
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(req.json));
})

server.listen(process.env.PORT || 3000);
