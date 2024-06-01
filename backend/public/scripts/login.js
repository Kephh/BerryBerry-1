// dom content loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM content loaded');
});


document.getElementById('loginForm').addEventListener('submit', handleLoginFormSubmit);

async function handleLoginFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const username = formData.get('username');
    const password = formData.get('password');
        
    try {
        console.log("trying");
        const response = await fetch('/users/loginPath', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        console.log("tried");

        if (response.ok) {
            handleSuccessfulLogin();
        } else {
            const errorData = await response.json();
            handleLoginError(errorData.error);
        }
    } catch (error) {
        console.error('Login error:', error);
        handleLoginError('An error occurred. Please try again later.');
    }
}

function handleSuccessfulLogin() {
    alert('Login successful');
    // Redirect to the home page or any other page after login
    window.location.href = '/home/';
}

function handleLoginError(errorMessage) {
    alert(errorMessage);
    // Display an error message to the user
    // console.log(errorMessage);
}
