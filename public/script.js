const socket = io();

// Listen for chat history and display it when a user joins
socket.on('chat history', (history) => {
    history.forEach((msg) => {
        displayMessage(msg);
    });
});

// Listen for new messages and display them
socket.on('chat message', (msg) => {
    displayMessage(msg);
});

// Function to send messages
function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (message) {
        socket.emit('chat message', message);
        input.value = ''; // Clear input field
    }
}

// Function to display messages in the chat
function displayMessage(msg) {
    const messages = document.getElementById('messages');
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight; // Auto-scroll to the latest message
}
