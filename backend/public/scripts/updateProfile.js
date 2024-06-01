window.onload = async function() {
    const updateProfileForm = document.getElementById('updateProfileForm');

    // Fetch current user's profile data
    try {
        const response = await fetch('/users/profilePath'); // Assuming this endpoint returns the current user's profile data
        if (!response.ok) {
            throw new Error('Failed to fetch user profile data');
        }
        const userData = await response.json();

        //get data prefilled in form
        document.getElementById('name').value = userData.name;
        document.getElementById('email').value = userData.email;
        document.getElementById('username').value = userData.username;
        document.getElementById('gender').value = userData.gender;

    } catch (error) {
        console.error('Error fetching user profile:', error);
        updateMessage.textContent = 'Error fetching user profile data. Please try again later.';
    }

    updateProfileForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const username = formData.get('username');
        const gender = formData.get('gender');

        try {
            const response = await fetch('/users/updateProfilePath', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, username, gender })
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }
            // redirect to profile page
            window.location.href = '/users/profile';

        } catch (error) {
            console.error('Error updating profile:', error);
            updateMessage.textContent = 'Error updating profile. Please try again later.';
        }
    });
};
