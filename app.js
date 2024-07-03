// Import the Express module
const express = require('express');

// Create an instance of an Express application
const app = express();

// Define the port number where the server will listen for requests
const PORT = 3000;

// Initialize an empty array to store data items
const data = [];

// Initialize a counter to assign unique IDs to new data items
let idCounter = 1;

// Use middleware to parse JSON request bodies
app.use(express.json());

// Define a POST route to create new data items
app.post('/data', (req, res) => {
    // Create a new data object with a unique ID and name from the request body
    const newData = {
        id: idCounter++,
        name: req.body.name
    };
    // Add the new data object to the data array
    data.push(newData);
    // Send a response with status 201 (Created) and the new data object as JSON
    res.status(201).json(newData);
});

// Define a GET route to retrieve all data items
app.get('/data', (req, res) => {
    // Send a response with status 200 (OK) and the entire data array as JSON
    res.status(200).json(data);
});

// Define a GET route to retrieve a data item by its ID
app.get('/data/:id', (req, res) => {
    // Find the data item with the matching ID
    const findData = data.find(item => item.id == req.params.id);
    // If the data item is not found, send a response with status 404 (Not Found) and an error message
    if (!findData) {
        return res.status(404).json({ error: 'Data not found' });
    }
    // If the data item is found, send a response with status 200 (OK) and the data item as JSON
    res.status(200).json(findData);
});

// Define a PUT route to update a data item by its ID
app.put('/data/:id', (req, res) => {
    // Find the data item with the matching ID
    const updateData = data.find(item => item.id == req.params.id);
    // If the data item is not found, send a response with status 404 (Not Found) and an error message
    if (!updateData) {
        return res.status(404).json({ error: 'Data not found' });
    }
    // Update the name of the data item if provided in the request body, otherwise keep the current name
    updateData.name = req.body.name || updateData.name;
    // Send a response with status 200 (OK) and the updated data item as JSON
    res.status(200).json(updateData);
});

// Define a DELETE route to delete a data item by its ID
app.delete('/data/:id', (req, res) => {
    // Find the index of the data item with the matching ID
    const index = data.findIndex(item => item.id == req.params.id);
    // If the data item is not found, send a response with status 404 (Not Found) and an error message
    if (index === -1) {
        return res.status(404).json({ error: 'Data not found' });
    }
    // Remove the data item from the data array
    data.splice(index, 1);
    // Send a response with status 200 (OK) and a success message
    res.status(200).json({ message: `Data with ID ${req.params.id} deleted` });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    // Log a message to the console indicating the server is running
    console.log(`App running on port localhost:${PORT}`);
});