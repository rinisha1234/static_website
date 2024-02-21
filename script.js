document.addEventListener('DOMContentLoaded', function() {
    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    function populateInputField() {
        const alertParam = getQueryParam('alert');
        if (alertParam) {
            const decodedAlert = decodeURIComponent(alertParam);
            const inputDataField = document.getElementById('inputData');
            inputDataField.value = decodedAlert; // Set the decoded alert as value
        }
    }

    populateInputField();

    document.getElementById('dataForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission

        const inputData = document.getElementById('inputData').value;
        const severityScore = document.getElementById('severityScore').value; // Get severity score value
        const scoredBy = document.getElementById('scoredBy').value; // Get scored by value
        const apiUrl = 'https://1ne4g6lm7e.execute-api.us-east-1.amazonaws.com/aiops/custom'; // Your API URL

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ alert: inputData, severity_score: severityScore, scored_by: scoredBy })
        })
        .then(response => response.json()) // Parse JSON response
        .then(data => {
            if (data.error) {
                // If there's an error message, display it directly
                document.getElementById('apiResponse').textContent = data.error;
            } else {
                // Otherwise, display the full response (or handle success as needed)
                document.getElementById('apiResponse').textContent = JSON.stringify(data, null, 2);
            }
        })
        .catch(error => {
            // Handle network errors or issues that prevent the request from completing
            console.error('Error:', error);
            document.getElementById('apiResponse').textContent = 'Failed to fetch';
        });
    });
});
