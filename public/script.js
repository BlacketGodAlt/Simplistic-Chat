const socket = io();

// Listen for chat history and display it
socket.on('chat history', (history) => {
  history.forEach((msg) => {
    displayMessage(msg);
  });
});

// Listen for new messages
socket.on('chat message', (msg) => {
  displayMessage(msg);
});

// Function to display messages
function displayMessage(msg) {
  const messages = document.getElementById('messages');
  const item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
}
