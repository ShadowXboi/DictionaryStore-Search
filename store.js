document.getElementById('storeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const word = document.getElementById('word').value.trim();
    const definition = document.getElementById('defination').value.trim(); 
  
    // Validate Inputs
    if (!word || !definition) {
      document.getElementById('feedback').innerText = 'Please enter both word and definition!';
      return;
    }
  
    // Send AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://jacksoncomp4537lab4-v5i5b.ondigitalocean.app/api/definitions', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
  
    xhr.onload = function() {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        document.getElementById('feedback').innerText = response.message;
      } else {
        document.getElementById('feedback').innerText = 'Error storing definition.';
      }
    };
  
    xhr.onerror = function() {
      document.getElementById('feedback').innerText = 'Error storing definition.';
    };
  
    xhr.send(JSON.stringify({ word, definition }));
  });
  
  //https://shadowxboi.github.io/DictionaryStore-Search/store.html