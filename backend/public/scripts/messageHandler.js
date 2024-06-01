document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM content loaded');
    loadMessages();
    const messageForm = document.getElementById('messageForm');
    if (messageForm) {
        messageForm.addEventListener('submit', handleMessageFormSubmit);
    }
});

async function loadMessages() {
    const otherUserId = getUserIdFromUrl();
    if (!otherUserId) {
        console.error('Invalid user ID');
        return;
    }

    try {
        const response = await fetch(`/messages/getPath/${otherUserId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const msgs = data.messages; // Extract messages array from the response object
        console.log('Fetched messages:', msgs); // Debugging log
        displayMessages(msgs);
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
}

async function handleMessageFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const message = formData.get('message');
    if (!message) {
        alert('Message cannot be empty');
        return;
    }

    const otherUserId = getUserIdFromUrl();
    if (!otherUserId) {
        console.error('Invalid user ID');
        return;
    }

    try {
        const response = await fetch(`/messages/sendPath/${otherUserId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });

        if (response.ok) {
            handleSuccessfulMessageSend();
            loadMessages(); // Reload messages after a successful send
        } else {
            const errorData = await response.json();
            handleMessageError(errorData.error);
        }
    } catch (error) {
        console.error('Message send error:', error);
        handleMessageError('An error occurred. Please try again later.');
    }
}

function handleSuccessfulMessageSend() {
    const messageForm = document.getElementById('messageForm');
    if (messageForm) {
        messageForm.reset();
    }
}

function handleMessageError(errorMessage) {
    alert(errorMessage);
}

function getUserIdFromUrl() {
    const path = window.location.pathname;
    const parts = path.split('/');
    const otherUserId = parts[parts.length - 1];
    return otherUserId || null;
}

function displayMessages(msgs) {
    const msgList = document.getElementById('messagesList');
    if (msgList) {
        msgList.innerHTML = ''; // Clear the list before adding new messages

        if (Array.isArray(msgs)) {
            msgs.forEach(msg => {
                const li = document.createElement('li');
                li.textContent = msg.content || JSON.stringify(msg); // Use msg.content if it exists, otherwise stringify the msg object
                msgList.appendChild(li);
            });
        } else {
            console.error('Expected an array of messages, but received:', msgs);
        }
    } else {
        console.error('messagesList element not found');
    }
}
