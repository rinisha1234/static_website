document.addEventListener('DOMContentLoaded', function() {
    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    function populateInputField() {
        const alertParam = getQueryParam('alert');
        if (alertParam) {
            const decodedAlert = decodeURIComponent(alertParam);
            console.log("Decoded Alert Param:", decodedAlert); // For debugging
            try {
                // Parse the JSON string
                const alertData = JSON.parse(decodedAlert);
                console.log("Parsed Alert Data:", alertData); // For debugging
                
                // Assuming you want to extract the description from the annotations
                // and populate it into the inputData field
                if (alertData.annotations && alertData.annotations.description) {
                    document.getElementById('inputData').value = alertData.annotations.description;
                } else {
                    console.log("Description not found in alert data");
                }
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
