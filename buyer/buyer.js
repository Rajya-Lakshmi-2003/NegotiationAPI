// buyer.js

document.getElementById('negotiationForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from submitting normally
    
    const requestData = {
        request: document.getElementById('request').value // Get the value of the request textarea
    };

    try {
        const response = await fetch('http://localhost:3000/negotiate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error('Failed to send negotiation request');
        }

        const responseData = await response.json();
        document.getElementById('response').innerText = JSON.stringify(responseData);
    } catch (error) {
        console.error('Error sending negotiation request:', error);
        document.getElementById('response').innerText = 'Error sending negotiation request. Please try again.';
    }
});
