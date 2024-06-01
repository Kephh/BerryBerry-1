// import { session } from "passport";

window.onload = async function() {
    // Fetch user profile data
    try {
        // fetch userId
        const response = await fetch('/users/profilePath');
        if (!response.ok) {
            throw new Error('Failed to fetch user profile data');
        }
        const userData = await response.json();
        displayProfile(userData);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        // Display error message on the page
        document.getElementById('profile-info').innerHTML = 'Error fetching user profile. Please try again later.';
    }
}

function displayProfile(userData) {
    // Construct HTML to display user profile
    const profileHTML = `
        <p>Name: ${userData.name}</p>
        <p>Email: ${userData.email}</p>
        <!-- Add more profile information here -->
    `;
    // Display profile information in the profile-info div
    document.getElementById('profile-info').innerHTML = profileHTML;
}
