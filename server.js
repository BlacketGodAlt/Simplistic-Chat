const http = require('http');
const { Server } = require('socket.io');

// Create a basic HTTP server
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Chat</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0; padding: 0;
                    display: flex; flex-direction: column;
                    height: 100vh; background-color: #f4f4f9;
                }
                #messages {
                    flex: 1; overflow-y: auto; padding: 10px;
                    list-style: none; margin: 0; background: #fff;
                    border: 1px solid #ddd; border-radius: 5px;
                }
                #form {
                    display: flex; padding: 10px; background: #f9f9f9;
                }
                #input {
                    flex: 1; padding: 10px; border: 1px solid #ddd;
                    border-radius: 5px; margin-right: 10px;
                }
                #send {
                    padding: 10px 15px; background: #007bff;
                    color: white; border: none; border-radius: 5px;
                    cursor: pointer;
                }
                #send:hover { background: #0056b3; }
            </style>
        </head>
        <body>
            <ul id="messages"></ul>
            <form id="form">
                <input id="input" autocomplete="off" placeholder="Type a message...">
                <button id="send" type="submit">Send</button>
            </form>
            <script src="/socket.io/socket.io.js"></script>
            <script>
                const socket = io();

                const form = document.getElementById('form');
                const input = document.getElementById('input');
                const messages = document.getElementById('messages');

                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    if (input.value) {
                        socket.emit('chat message', input.value);
                        input.value = '';
                    }
                });

                socket.on('chat message', function(msg) {
                    const item = document.createElement('li');
                    item.textContent = msg;
                    messages.appendChild(item);
                    messages.scrollTop = messages.scrollHeight;
                });
            </script>
        </body>
        </html>
    `);
});

// Attach Socket.IO to the server
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
