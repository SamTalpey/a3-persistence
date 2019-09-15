// Submit function for button
const submit = function() {
  console.log('Submit called');
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
  console.log('Submitted job: ' + newJob);

  // Sending POST request to server
  fetch('/submit', {
      method:'POST',
      body: JSON.stringify(newJob),
      headers: {'Content-Type': 'application/json'}
    })
    .catch(err => {
      console.log(err);
    })
    getTables();
    // TODO reset form here?
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

// Fetch data from server and update tables on client
const getTables = function() {
  fetch('/tables', {
    method: 'GET'
  })
  .then(response => response.json())
  .then(data => updateTables(data));
}

// Update tables with data from server
const updateTables = function(jobs) {
  jobs.forEach(job => {
    let id = job["day"] + job["job"];
    document.getElementById(id).innerHTML = job["name"];
  });
}

window.onload = function() {
  // Set up button functions
  const submitBtn = document.querySelector('.submit');
  submitBtn.onclick = submit;
  const resetBtn = document.querySelector('.reset');
  resetBtn.onclick = reset;

  // Update table display
  getTables();
}
