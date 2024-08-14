const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const initSocketIO = require('./utils/socket');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.get('/', (req, res) => {
    res.send("hello");
});

// Create the HTTP server
const server = createServer(app);

// Initialize Socket.io with the server
const io = initSocketIO(server);

// Start the server
server.listen(3000, () => {
    console.log("Server is running on http://127.0.0.1:3000");
});
