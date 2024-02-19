function searchWord(event) {
  event.preventDefault(); // Prevents the default form submission action.

  // Trims whitespace from the input and retrieves the value.
  let word = document.getElementById("WordFieldSearch").value.trim();

  // Input validation: Ensures the input is not empty and not numeric.
  if (!word || !isNaN(word)) {
    document.getElementById('searchResult').textContent = "Error: Please enter a valid word (non-empty, non-numeric).";
    return; // Stops execution if validation fails.
  }

  // Initializes a new XMLHttpRequest object for asynchronous HTTP request.
  const xhr = new XMLHttpRequest();
  // Configures the request: Method (GET), URL, and asynchronous flag (true by default).
  xhr.open("GET", `https://jacksoncomp4537lab4-v5i5b.ondigitalocean.app/api/definitions/?word=${word}`);

  // Defines what happens when the request receives a response.
  xhr.onload = () => {
    // Parses the JSON formatted response text.
    const response = JSON.parse(xhr.responseText);
    // Selects the element to display the search result.
    const resultElement = document.getElementById('searchResult');

    // Checks the HTTP status code to determine the result of the request.
    if (xhr.status === 200) {
      // The request was successful, checks if the word was found.
      if (response.definition !== undefined) {
        // Word is found: Displays the definition.
        resultElement.innerHTML = `Definition: ${response.definition}`;
      } else {
        // Word is not found: Displays a message indicating the word is not found.
        resultElement.textContent = `Word not found.`;
      }
    } else {
      // Handles HTTP error responses by displaying the error message.
      resultElement.textContent = `Error: ${response.message}`;
    }
  };

  // Defines what happens in case of an error with the request (network error, etc.).
  xhr.onerror = () => {
    document.getElementById('searchResult').textContent = "An error occurred during the request.";
  };

  // Sends the request.
  xhr.send();
}

