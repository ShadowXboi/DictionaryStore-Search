//chat-gpt is used
function submitWord(event) {
  event.preventDefault(); // Prevent form from submitting the traditional way

  // Trims whitespace and retrieves input values for word and definition
  let word = document.getElementById("WordField").value.trim();
  let definition = document.getElementById("DefinitionField").value.trim();

  // Input validation: Check if inputs are non-empty and not just numbers
  if (!word || !definition || !isNaN(word) || !isNaN(definition)) {
    document.getElementById('submitResult').textContent = "Error: Word and definition must be non-empty strings and cannot be just numbers.";
    return; // Stop the function if validation fails
  }

  // Initializes a new XMLHttpRequest for asynchronous request
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://jacksoncomp4537lab4-v5i5b.ondigitalocean.app/api/definitions");
  xhr.setRequestHeader("Content-Type", "application/json");

  // Converts word and definition into a JSON string for the request body
  const body = JSON.stringify({ word, definition });

  // Defines what happens on successful data submission
  xhr.onload = () => {
    const response = JSON.parse(xhr.responseText); // Parses the JSON response
    const resultElement = document.getElementById('submitResult');

    // Checks if the request was successful and updates the UI accordingly
    if (xhr.status === 200 || xhr.status === 201) {
      resultElement.innerHTML = `Word submitted successfully! <br> Total Requests: ${response.requestNumber}`;
    } else {
      resultElement.textContent = `Error: ${response.message}`;
    }
  };

  // Defines what happens in case of an error during the request
  xhr.onerror = () => {
    document.getElementById('submitResult').textContent = "An error occurred during the request.";
  };

  // Sends the request with the word and definition as payload
  xhr.send(body);
}

// Attach the submitWord function to the form submission event
document.getElementById("storeForm").addEventListener("submit", submitWord);

