document.addEventListener('DOMContentLoaded', function() {
    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    function populateInputField() {
        const alertParam = getQueryParam('alert');
        if (alertParam) {
            const decodedAlert = decodeURIComponent(alertParam);
            try {
                console.log(decodedAlert);
                const alertData = JSON.parse(decodedAlert);
                // Assuming the alert data is a simple value or JSON-encoded object
                // Adjust the property access as needed based on your data structure.
                // Example: directly use the alert data if it's a simple value
                // or use a specific property from the alertData object.
                // Ensure your JSON structure is correctly addressed here.
                document.getElementById('inputData').value = alertData.someProperty || '';
            } catch (e) {
                console.error("Parsing error:", e);
                document.getElementById('alertDataDisplay').textContent = "Parsing error: " + e.toString();
            }
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
            body: JSON.stringify({ key: inputData })
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
