// negotiationAPI.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to enable CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(bodyParser.json());

let negotiationRequest = null;

// Endpoint for receiving negotiation requests from buyer app
app.post('/negotiate', (req, res) => {
    // Store the negotiation request
    negotiationRequest = req.body;
    console.log('Received negotiation request:', negotiationRequest);
    res.sendStatus(200);
});

// Endpoint for fetching negotiation request from seller app
app.get('/negotiate', (req, res) => {
    if (negotiationRequest) {
        res.json(negotiationRequest);
    } else {
        res.status(404).json({ error: 'No negotiation request available' });
    }
});

// Endpoint for receiving negotiation response from seller app
app.post('/respond', (req, res) => {
    const negotiationResponse = req.body;
    console.log('Received negotiation response:', negotiationResponse);
    // Forward the response to the buyer app
    // You can replace this URL with the actual URL of your Buyer App
    const buyerAppURL = 'http://127.0.0.1:5500/response'; // Assuming Buyer App is running on port 5500
    fetch(buyerAppURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(negotiationResponse)
    })
    .then(response => {
        if (response.ok) {
            console.log('Successfully sent negotiation response to Buyer App.');
        } else {
            console.error('Failed to send negotiation response to Buyer App:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error sending negotiation response to Buyer App:', error);
    });
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Negotiation API listening on port ${PORT}`);
});
