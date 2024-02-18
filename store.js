document.getElementById('storeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const word = docunment.getElementById('word').value.trim();
    const defination = document.getElementById('defination').value.trim();

    // validate Inputs
    if (!word || !defination){
        document.getElementById('feedback').innerText = 'Please enter both word and defination!'
        return;
    }

    //send AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://localhost:3000/api/definations', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if(xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            document.getElementById('feeback').innerText = response.message;
        } else {
            document.getElementById('feedback').innerText = 'Error storing defination.';
        }
    };

    xhr.oneerror = function() {
        document.getElementById('feedback').innerText = 'Error storing defination.';
    };
    xhr.send(JSON.stringify({word, defination}));
});