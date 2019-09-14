const submit = function() {
  console.log('submit called');
  let jobSelector = document.getElementById('job');
  var newJob = {
    name: document.getElementById('name').value,
    job: jobSelector[jobSelector.selectedIndex].value,
    day: function() {
      if(document.getElementById('tues').checked) {
        return document.getElementById('tues').value;
      }
      else return document.getElementById('thur').value;
    }
  }
 
  
  
 fetch('/submit', {
     method:'POST',
     newJob
   })
   .then(function(response) {
     alert('New house job submitted');
   })
   
}

const reset = function() {
  
}

window.onload = function() {
  const submitBtn = document.querySelector('.submit');
  submitBtn.onclick = submit;
  const resetBtn = document.querySelector('.reset');
  resetBtn.onclick = reset;
}
