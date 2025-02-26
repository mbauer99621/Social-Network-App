// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes'); // This will import your routes
require('./config/connection'); // Ensure MongoDB connection is set up

// Initialize the Express app
const app = express();

// Set the port to either the environment variable or 3001
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use API routes
app.use('/api', routes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
