document.getElementById('signupForm').addEventListener('submit', handleSignupFormSubmit);

async function handleSignupFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const gender = formData.get('gender');
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    
    try {
        console.log("trying");
        const response = await fetch('/users/signupPath', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, gender, username, email, password })
        });
        console.log("tried");


        if (response.ok) {
            const newUser = await response.json();
            console.log(newUser);
            handleSuccessfulSignup();
        } else {
            const errorData = await response.json();
            handleSignupError(errorData.error);
        }
    } catch (error) {
        console.error('Signup error:', error);
        handleSignupError('An error occurred. Please try again later.');
    }
}

function handleSuccessfulSignup() {
    alert('Signup successful');
    
    // Check if a cookie is set
    const cookieExists = document.cookie.split(';').some((item) => item.trim().startsWith('jwt='));
    
    // If the cookie exists, redirect to /home
    if (cookieExists) {
        window.location.href = '/home/';
    }
    
    // If the cookie doesn't exist, redirect to /login
    else {
        window.location.href = '/users/login/';
    }
    // Otherwise, perform other actions if needed
}

function handleSignupError(errorMessage) {
    alert(errorMessage);
}
