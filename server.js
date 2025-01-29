const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Initialize Express and create an HTTP server
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO with the server
const io = new Server(server);

// Serve static files (if you have a frontend)
app.use(express.static('public'));

// Handle root route for testing purposes
app.get('/', (req, res) => {
  res.send('Multiplayer chat server is running!');
});

// Handle socket connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for chat messages and broadcast them
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  // Handle user disconnections
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Dynamically assign the port from the environment variable (for Koyeb or other hosts)
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
