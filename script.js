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
        .then(response => {
            if (!response.ok) {
                // If response status code is not OK, parse JSON to get error message and throw it
                return response.json().then(err => {
                    throw Error(err.error || 'Unknown API error');
                });
            }
            return response.json(); // Parse successful response to JSON
        })
        .then(data => {
            if (data.error) {
                // Display API error message
                document.getElementById('apiResponse').textContent = data.error;
            } else {
                // Display success message or data
                document.getElementById('apiResponse').textContent = "Success: " + JSON.stringify(data, null, 2);
            }
        })
        .catch(error => {
            // Display network errors or errors thrown from the response handling
            console.error('Error:', error);
            document.getElementById('apiResponse').textContent = error.message;
        });
    });
});
