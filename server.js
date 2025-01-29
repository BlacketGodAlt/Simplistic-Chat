const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Store chat history (array)
const chatHistory = [];

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Root route for testing
app.get('/', (req, res) => {
    res.send('Multiplayer chat server is running!');
});

// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Send chat history to the newly connected user
    console.log("Sending chat history:", chatHistory);
    socket.emit('chat history', chatHistory);

    // Listen for incoming chat messages
    socket.on('chat message', (msg) => {
        // Save message to history
        chatHistory.push(msg);

        // Keep only the last 50 messages
        if (chatHistory.length > 50) {
            chatHistory.shift();
        }

        // Broadcast message to all users
        io.emit('chat message', msg);
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Define port for deployment and local testing
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
