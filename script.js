document.addEventListener('DOMContentLoaded', function() {
    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    function populateInputField() {
        const alertParam = getQueryParam('alert');
        if (alertParam) {
            const decodedAlert = decodeURIComponent(alertParam);
            // Set the entire decoded JSON string as the value of the inputData field
            document.getElementById('inputData').value = decodedAlert;
        }
    }

    populateInputField();

    document.getElementById('dataForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const inputData = document.getElementById('inputData').value;
        const apiUrl = 'https://1ne4g6lm7e.execute-api.us-east-1.amazonaws.com/aiops/hello';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ alert: inputData })
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
});
