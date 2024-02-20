document.getElementById('dataForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const inputData = document.getElementById('inputData').value;
    const severityScore = document.getElementById('severityScore').value;
    const scoredBy = document.getElementById('scoredBy').value; // Get scored by value

    const apiUrl = 'https://1ne4g6lm7e.execute-api.us-east-1.amazonaws.com/aiops/hello';

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ alert: inputData, severity_score: severityScore, scored_by: scoredBy }) // Include scored by in payload
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
