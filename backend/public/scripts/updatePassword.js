// JavaScript code for update password page

// Example functionality: handle form submission
document.getElementById('updatePasswordForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    // Extract form data
    const formData = new FormData(this);
    const oldPassword = formData.get('oldPassword');
    const newPassword = formData.get('newPassword');
    
    // Send form data to server for password update
    try {
        const response = await fetch('/users/updatePasswordPath', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ oldPassword, newPassword })
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message); // Display success message
            // Redirect to login page or perform other actions
            window.location.href = '/home/feed';
        } else {
            const errorData = await response.json();
            alert(errorData.error); // Display error message
        }
    } catch (error) {
        console.error('Password update error:', error);
        alert('An error occurred. Please try again later.');
    }
});
