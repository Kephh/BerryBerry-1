document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM content loaded');
});

window.onload = async function() {
    try {
        const otherUserId = getUserIdFromUrl();
        console.log(otherUserId);
        const userData = await fetchUserProfile(otherUserId);
        console.log('Fetched user data:', userData);
        displayProfile(userData);
        console.log('Displayed user data:', userData);
    } catch (error) {
        handleError(error);
    }
}

function getUserIdFromUrl() {
    // Get the path from the URL
    const path = window.location.pathname;
    
    // Extract the last part of the path (the user ID)
    const parts = path.split('/');
    const otherUserId = parts[parts.length - 1];

    // Log the extracted user ID for debugging
    console.log('otherUserId:', otherUserId);

    return otherUserId;
}

async function fetchUserProfile(otherUserId) {
    const response = await fetch(`/users/path/${otherUserId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch user profile data');
    }
    
    return await response.json();
}

function displayProfile(userData) {
    const profileHTML = `
        <p>Name: ${userData.name}</p>
        <p>Email: ${userData.email}</p>
        <!-- Add more profile information here -->
        <button id="message-btn">Message</button>
    `;
    document.getElementById('profile-info').innerHTML = profileHTML;

    document.getElementById('message-btn').addEventListener('click', function() {
        // Redirect to the message page with the current profile userId
        const otherUserId = getUserIdFromUrl();
        const messageUrl = `/messages/${otherUserId}`;
        window.location.href = messageUrl;
    });
}

function handleError(error) {
    console.error('Error fetching user profile:', error);
    document.getElementById('profile-info').innerHTML = 'Error fetching user profile. Please try again later.';
}
