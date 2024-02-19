// Function to search for a definition
function searchDefinition() {
  const searchWord = document.getElementById('searchWord').value.trim();

  // Validate input
  if (!searchWord) {
    document.getElementById('result').innerText = 'Please enter a word to search.';
    return;
  }

  // Send AJAX request
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://jacksoncomp4537lab4-v5i5b.ondigitalocean.app/api/definitions/?word=${encodeURIComponent(searchWord)}`, true);

  xhr.onload = function() {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      document.getElementById('result').innerText = response.message;
    } else if (xhr.status === 404) {
      document.getElementById('result').innerText = `Word '${searchWord}' not found.`;
    } else {
      document.getElementById('result').innerText = 'Error searching for definition.';
    }
  };

  xhr.onerror = function() {
    document.getElementById('result').innerText = 'Error searching for definition.';
  };

  xhr.send();
}


//https://shadowxboi.github.io/DictionaryStore-Search/search.html