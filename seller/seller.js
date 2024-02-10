// seller.js

document.getElementById('responseForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from submitting normally
    
    const responseData = {
        response: document.getElementById('response').value // Get the value of the response textarea
    };

    try {
        const response = await fetch('http://localhost:3000/respond', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(responseData)
        });

        if (!response.ok) {
            throw new Error('Failed to send negotiation response');
        }

        console.log('Successfully sent negotiation response to Negotiation Engine API.');
        document.getElementById('response').value = ''; // Clear the response textarea
    } catch (error) {
        console.error('Error sending negotiation response:', error);
        alert('Error sending negotiation response. Please try again.');
    }
});
