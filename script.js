document.getElementById('dataForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get the value of the Data to Send textarea
    const inputData = document.getElementById('inputData').value;

    // Get the value of the Severity Score dropdown
    const severityScore = document.getElementById('severityScore').value;

    // Construct the payload object with the inputData and severityScore
    const payload = {
        alert: inputData,
        severity_score: severityScore
    };

    // URL of the API Gateway endpoint
    const apiUrl = 'https://1ne4g6lm7e.execute-api.us-east-1.amazonaws.com/aiops/hello';

    // Make the fetch request with the payload
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
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
