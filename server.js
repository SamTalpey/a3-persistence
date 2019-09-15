const express = require('express'),
    server = express(),
    bodyparser = require('body-parser'),
    low = require('lowdb'),
    FileSync = require('lowdb/adapters/FileSync'),
    adapter = new FileSync('db.json'),
    db = low(adapter);

const jobs = [];

// Setting defaults for empty JSON file
db.defaults({ jobs: [], count: 0})
  .write();

// Deliver all files to public folder
server.use(express.static('public/'));

// Get JSON when relevant
server.use(bodyparser.json());

// Explicity handle domain name
server.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
})

// Handling requests for job data for tables
server.get('/tables', function(req, res) {
  console.log('GET request to /tables');
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(jobs));
})

// Handling posts from form submissions
server.post('/submit', bodyparser.json(), function(req, res) {
  console.log('POST request to /submit');
  jobs.push(req.body);
  db.get('jobs')
    .push(req.body)
    .write();
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(jobs));
})

// Updating server memory from file
db.get('jobs').value().forEach(job => {
  jobs.push(job);
});
console.log('Current jobs stored are listed below');
console.log(jobs);
server.listen(process.env.PORT || 3000);
