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
            <title>My Chat</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0; padding: 0;
                    display: flex; flex-direction: column;
                    height: 100vh; background-color: #f4f4f9;
                }
                #title {
                    background-color: #007bff; color: white;
                    padding: 10px; text-align: center; font-size: 20px;
                }
                #username-container {
                    display: flex; flex-direction: column;
                    align-items: center; justify-content: center;
                    flex: 1;
                }
                #username-form {
                    display: flex; flex-direction: column; align-items: center;
                }
                #username-input {
                    padding: 10px; border: 1px solid #ddd; border-radius: 5px;
                    margin-bottom: 10px; font-size: 16px;
                }
                #username-submit {
                    padding: 10px 20px; background: #007bff; color: white;
                    border: none; border-radius: 5px; cursor: pointer;
                }
                #username-submit:hover { background: #0056b3; }
                #chat-container {
                    display: none; flex: 1; flex-direction: column;
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
            <div id="title">Simplistic Chat 0.1</div>
            <div id="username-container">
                <form id="username-form">
                    <input id="username-input" placeholder="Enter your username..." required />
                    <button id="username-submit" type="submit">Join Chat</button>
                </form>
            </div>
            <div id="chat-container">
                <ul id="messages"></ul>
                <form id="form">
                    <input id="input" autocomplete="off" placeholder="Type a message...">
                    <button id="send" type="submit">Send</button>
                </form>
            </div>
            <script src="/socket.io/socket.io.js"></script>
            <script>
                const socket = io();

                const usernameForm = document.getElementById('username-form');
                const usernameInput = document.getElementById('username-input');
                const usernameContainer = document.getElementById('username-container');
                const chatContainer = document.getElementById('chat-container');
                const form = document.getElementById('form');
                const input = document.getElementById('input');
                const messages = document.getElementById('messages');

                let username = '';

                // Handle username submission
                usernameForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    username = usernameInput.value.trim();
                    if (username) {
                        socket.emit('set username', username);
                        usernameContainer.style.display = 'none';
                        chatContainer.style.display = 'flex';
                    }
                });

                // Handle message sending
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    if (input.value) {
                        socket.emit('chat message', { username, message: input.value });
                        input.value = '';
                    }
                });

                // Receive messages
                socket.on('chat message', function({ username, message }) {
                    const item = document.createElement('li');
                    item.textContent = \`\${username}: \${message}\`;
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
    let user = '';

    // Set username
    socket.on('set username', (username) => {
        user = username;
        console.log(`${user} joined the chat`);
    });

    // Handle incoming messages
    socket.on('chat message', ({ username, message }) => {
        io.emit('chat message', { username, message });
    });

    socket.on('disconnect', () => {
        console.log(`${user} left the chat`);
    });
});

// Start the server
const PORT = process.env.PORT || 3000; // Change 8000 to 3000
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
