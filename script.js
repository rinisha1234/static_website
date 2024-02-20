document.getElementById('dataForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submit action

    const inputData = document.getElementById('inputData').value;
    const apiUrl = 'https://1ne4g6lm7e.execute-api.us-east-1.amazonaws.com/aiops/hello'; // Replace with your actual API URL

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key: inputData }) // Adjust according to your API's expected request body
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('apiResponse').textContent = JSON.stringify(data, null, 2);
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('apiResponse').textContent = 'Failed to fetch';
    });
});
