window.onload = async function() {
    console.log("Fetching");
    try {
        const response = await fetch('/home/data');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        // Display error message on the page
        document.getElementById('products-list').innerHTML = 'Error fetching products. Please try again later.';
    }

    // Add event listener to the logout button
    document.getElementById('logout-btn').addEventListener('click', logout);
}

async function logout() {
    try {
        const response = await fetch('/users/logoutPath', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            // Redirect to the login page or any other page after logout
            window.location.href = '/users/login'; // Redirect to login page
        } else {
            throw new Error('Logout failed');
        }
    } catch (error) {
        console.error('Logout error:', error);
        // Display error message on the page
        alert('Logout failed. Please try again.');
    }
}

function displayProducts(products) {
    const productListDiv = document.getElementById('products-list');
    productListDiv.innerHTML = ''; // Clear previous content
    
    if (products.length === 0) {
        productListDiv.innerHTML = 'No products available.';
        return;
    }

    const ul = document.createElement('ul');
    products.forEach(product => {
        const li = document.createElement('li');
        
        const a = document.createElement('a');
        a.href = `/products/view/${product._id}`; // Assuming the product detail page URL pattern
        a.textContent = `${product.name} - $${product.price}`;
        
        li.appendChild(a);
        ul.appendChild(li);
    });
    productListDiv.appendChild(ul);
}
