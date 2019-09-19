// Submit function for button
const submit = function() {
  let jobSelector = document.getElementById('job')
  let day = null;
  if(document.getElementById('tues').checked) {
    day = document.getElementById('tues').value;
  }
  else day = document.getElementById('thur').value;

  // putting the submitted job into a variable
  var newJob = {
    name: document.getElementById('name').value,
    job: jobSelector[jobSelector.selectedIndex].value,
    day: day
  }

  // sending POST request to server
  fetch('/submit', {
      method:'POST',
      body: JSON.stringify(newJob),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    })
    .then(console.log)
    .catch(err => console.error)
    getTables();
}

// Login function for button
const login = function() {
  let username = document.getElementById('username').value,
      password = document.getElementById('password').value;
      user = {username: username, password: password};

  if(username === '' || password === '') {
    alert('Missing credentials, please enter a username and password');
    return;
  }

  fetch('/login', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {'Content-Type': 'application/json'}
  })
  .then(window.location='/')
  .then(loggedIn = true)
}

// Getting currently logged in user
const display = function() {
  var username = '';
  fetch('/username', {
    method: 'GET',
    credentials: 'include'
  })
  .then(response => response.json())
  .then(user => {
    username = user['username'];
    console.log('Checking if logged in (tables)');
    console.log(username, typeof username);
    // Sets job form to visible if a user logged in 
    if(typeof(username) === 'string' && username != '!display') {
      document.getElementById('jobForm').hidden = false;
      document.getElementById('temp').hidden = true;
      console.log('Form visible');
    }
  })
}

// Reset day function for button
const reset = function() {
  let day = function() {
        if(document.getElementById('tues').checked) {
          return document.getElementById('tues').value;
        }
        else return document.getElementById('thur').value;
      }
  
  // TODO Reset jobs for given day
}

// Fetch login page
const getLogin = function() {
  fetch('/login', {
    method: 'GET'
  })
}

// Fetch data from server and update tables on client
const getTables = function() {
  fetch('/tables', {
    method: 'GET',
    credentials: 'include'
  })
  .then(response => response.json())
  .then(data => updateTables(data));
}

// Update tables with data from server
const updateTables = function(jobs) {
  // TODO requires user to be logged in in order to show data 
  var username = '';
  fetch('/username', {
    method: 'GET',
    credentials: 'include'
  })
  .then(response => response.json())
  .then(user => {
    username = user['username'];
    console.log('Current user:', username);

    jobs.forEach(job => {
      let id = job['day'] + job['job'];
      document.getElementById(id).innerHTML = job['name'];
      if(job['owner'] === username) {
        document.getElementById(id).style.color = '#FF0000'
      }
    })
  })
}

window.onload = function() {
  // Homepage
  if(document.URL.endsWith('/')) {
    const submitBtn = document.querySelector('.submit');
    submitBtn.onclick = submit;
    const resetBtn = document.querySelector('.reset');
    resetBtn.onclick = reset;
    const displayBtn = document.querySelector('.display');
    displayBtn.onclick = display;
    getTables();
  }
  // Login Page
  else if(document.URL.endsWith('/login')) {
    const loginBtn = document.querySelector('.login');
    loginBtn.onclick = login;
  }
}
