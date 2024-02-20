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
                const alertData = JSON.parse(decodedAlert);
                // Here, you need to adjust according to your specific alert data structure
                // For example, if alertData itself is the value you want to set:
                document.getElementById('inputData').value = alertData;
                // OR if alertData contains a property you want to use:
                // document.getElementById('inputData').value = alertData.someProperty;
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
