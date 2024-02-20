document.addEventListener('DOMContentLoaded', function() {
    // Function to get the value of a specific query parameter
    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Function to parse and set the alert data as the input field's value
    function populateInputField() {
        const alertParam = getQueryParam('alert');
        if (alertParam) {
            const decodedAlert = decodeURIComponent(alertParam);
            try {
                // Assuming the alert data is a simple value or JSON-encoded object
                const alertData = JSON.parse(decodedAlert);
                // Adjust the property access as needed based on your data structure
                // For example, if your alert data structure is complex, navigate through it accordingly
                document.getElementById('inputData').value = alertData; // Directly use the alert data
            } catch (e) {
                console.error("Parsing error:", e);
                // Handle parsing error, maybe set input field to a default value or display an error
            }
        }
    }

    // Populate the input field with the alert data when the page loads
    populateInputField();

    // Event listener for form submission
    document.getElementById('dataForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the default form submit action

        const inputData = document.getElementById('inputData').value;
        const apiUrl = 'https://1ne4g6lm7e.execute-api.us-east-1.amazonaws.com/aiops/hello'; // Your actual API URL

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
});
