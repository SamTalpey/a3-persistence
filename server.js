const html = require('html'),
    mime = require('mime'),
    express = require('express'),
    server = express(),
    bodyparser = require('body-parser'),
    low = require('lowdb'),
    FileSync = require('lowdb/adapters/FileSync'),
    adapter = new FileSync('db.json'),
    db = low(adapter),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    session = require('express-session'),
    compression = require('compression'),
    morgan = require('morgan');

var jobs = [];
var users = [];

const myLocalStrategy = function(username, password, done) {
  console.log('Trying to authenticate');
  const user = db.get('users').find({username: username}).value();
  let creds = {username: username, password: password};
  if(!user) {
    users.push(creds);
    db.get('users')
      .push(creds)
      .write();
    console.log('New user created: ', creds);
    return done(null, creds);
  }
  else {
    if(user.password === password) {
      console.log('User authenticated: ', creds)
      return done(null, creds);
    }
    else {
      console.log('Bad login: username or password incorrect');
      return done(null, false, {message: 'Bad login: username or password incorrect'});
    }
  }
}

// Packages to use
server.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
server.use(morgan('dev'));
server.use(express.static('public'));
server.use(bodyparser.urlencoded({extended: true}));
server.use(bodyparser.json());
passport.use(new LocalStrategy(myLocalStrategy));
server.use(passport.initialize());
server.use(passport.session());
server.use(compression());

// Setting defaults for empty JSON file
db.defaults({ jobs: [], users: [{username: 'admin', password: 'admin'}], count: 0})
  .write();
  
// Serializing users via passport
passport.serializeUser((user, done) => done(null, user.username));

// Deserializing users via passport
passport.deserializeUser((username, done) => {
  const user = db.get('users').find({username: username}).value();
  console.log('Deserializing: ', username);

  if(user) {
    console.log('Deserializing succeeded for user: ', user);
    done(null, user);
  }
  else {
    console.log('Deserializing failed');
    done(null, false, {message: 'User not found, session unable to be restored'});
  }
});

// Explicity handle domain name
server.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

// Explicitly handle login page
server.get('/login', function(req, res) {
  res.sendFile(__dirname + '/public/views/login.html');
});

// Handling requests for job data for tables
server.get('/tables', function(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(jobs));
});

server.get('/username', function(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  console.log('Current user is: ', req.user);

  if(typeof(req.user) === 'undefined') {
    let fakeUser = {username: '!display'};
    res.end(JSON.stringify(fakeUser))
  }
  else res.end(JSON.stringify(req.user));
})

// Alert on bad logins
server.get('/badLogin', function(req, res) {
  console.log('Bad Login: something went wrong with the authentication');
});

// Handling posts from form submissions
server.post('/submit', bodyparser.json(),
  function(req, res) {
    req.body['owner'] = req.user.username;
    let dupe = db.get('jobs').find({job: req.body.job}).value();
    console.log('Dupe should be:', db.get('jobs').find({job: req.body.job}).value())
    console.log('Dupe:', dupe);
    if(typeof(dupe) != 'undefined') {
      db.get('jobs')
        .remove({job: req.body['job']})
        .write();
      jobs = jobs.filter(function(value, index, arr) {
        return value.job != req.body['job'];
      })
      console.log(jobs);
    }
    jobs.push(req.body);
    db.get('jobs')
      .push(req.body)
      .write();
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(jobs));
});

// Passport authentication on login
server.post('/login', 
  passport.authenticate('local', {failureRedirect: '/badLogin'}),
  function(req, res) {
    res.json({status: true});
  }
);

// Updating server memory from file
db.get('jobs').value().forEach(job => {
  jobs.push(job);
});
db.get('users').value().forEach(user => {
  users.push(user);
});

console.log('Current jobs stored are listed below');
console.log(jobs);
console.log('Current users stored are listed below');
console.log(users);
server.listen(process.env.PORT || 3000);
