function searchDefinition() {
    const searchWord = document.getElementById('searchWord').value.trim();
  
    // Validate input
    if (!searchWord) {
      document.getElementById('result').innerText = 'Please enter a word to search.';
      return;
    }
  
    // Send AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:3000/api/definitions/?word=${encodeURIComponent(searchWord)}`, true);
  
    xhr.onload = function() {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        document.getElementById('result').innerText = response.message;
      } else {
        document.getElementById('result').innerText = 'Word not found.';
      }
    };
  
    xhr.onerror = function() {
      document.getElementById('result').innerText = 'Error searching for definition.';
    };
  
    xhr.send();
  }
  