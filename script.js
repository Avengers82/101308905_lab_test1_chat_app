const socket = io();

    // Example username obtained from login/signup
    const username = 'exampleUser';

    // Join the room when the user selects one
    function joinRoom() {
        const selectedRoom = document.getElementById('roomList').value;
        socket.emit('joinRoom', { username, room: selectedRoom });
    }

    // Listen for room list updates
    socket.on('updateRoomList', (rooms) => {
        updateRoomList(rooms);
    });

    // Update the dropdown with the available rooms
    function updateRoomList(rooms) {
        const roomListDropdown = document.getElementById('roomList');
        roomListDropdown.innerHTML = '';
        rooms.forEach(room => {
            const option = document.createElement('option');
            option.value = room;
            option.text = room;
            roomListDropdown.add(option);
        });
    }

    // Listen for chat messages
    socket.on('chatMessage', (data) => {
        displayMessage(data);
    });

    // Display chat messages in the UI
    function displayMessage(data) {
        const { username, content } = data;
        const messageElement = document.createElement('div');
        messageElement.innerHTML = `<strong>${username}:</strong> ${content}`;
        document.getElementById('chatMessages').appendChild(messageElement);
    }

    // Listen for user typing notifications
    socket.on('userTyping', (username) => {
        document.getElementById('typingIndicator').innerText = `${username} is typing...`;
    });

    // Handle user sending a chat message
    document.getElementById('messageForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const messageInput = document.getElementById('messageInput');
        const messageContent = messageInput.value.trim();

        if (messageContent !== '') {
            // Send the message to the server
            socket.emit('chatMessage', { username, room: 'selectedRoom', content: messageContent });

            // Display the message in the UI
            displayMessage({ username, content: messageContent });

            // Clear the input field
            messageInput.value = '';
        }
    });

    // Handle user typing
    document.getElementById('messageInput').addEventListener('input', () => {
        socket.emit('typing');
    });

    // Listen for private messages
    socket.on('privateMessage', (data) => {
        displayPrivateMessage(data);
    });

    // Display private messages in the UI
    function displayPrivateMessage(data) {
        const { from, message } = data;
        const privateMessageElement = document.createElement('div');
        privateMessageElement.innerHTML = `<em>${from} (private):</em> ${message}`;
        document.getElementById('privateMessages').appendChild(privateMessageElement);
    }

    // Example code to send a private message
    function sendPrivateMessage() {
        const recipient = 'exampleRecipient';
        const privateMessage = 'Hello, this is a private message!';
        socket.emit('privateMessage', { to: recipient, message: privateMessage });
    }

    // Handle user disconnecting
    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });

// Assume you have an array of available rooms
const availableRooms = ['devops', 'cloud-computing', 'covid19', 'sports', 'nodeJS'];

// Function to populate the room list
function populateRoomList() {
    const roomListDropdown = document.getElementById('roomList');
    availableRooms.forEach(room => {
        const option = document.createElement('option');
        option.value = room;
        option.text = room;
        roomListDropdown.add(option);
    });
}

// Function to show room selection form
function showRoomSelection() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('roomSelection').style.display = 'block';
    populateRoomList();
}

// Function to join a selected room
function joinRoom() {
    const selectedRoom = document.getElementById('roomList').value;
    
    // Add logic to handle joining the room (emit socket event, etc.)
    console.log('Joining room:', selectedRoom);
}
