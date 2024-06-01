
document.addEventListener('DOMContentLoaded', function() {
    fetchProductDetails();
});

async function fetchProductDetails() {
    console.log('Fetching product details...');
    const productId = getProductIdFromUrl();
    console.log('Product ID:', productId);

    try {
        const response = await fetch(`/products/viewPath/${productId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        console.log('Fetched product data:', data);

        const product = data.product; // Access the nested product object
        displayProductDetails(product);
    } catch (error) {
        console.error('Error fetching product details:', error);
        document.getElementById('errorMessage').textContent = 'Error fetching product details. Please try again later.';
    }
}

function getProductIdFromUrl() {
    const path = window.location.pathname;
    const parts = path.split('/');
    return parts[parts.length - 1];
}

function displayProductDetails(product) {
    if (!product || typeof product !== 'object') {
        console.error('Invalid product data:', product);
        document.getElementById('errorMessage').textContent = 'Invalid product data. Please try again later.';
        return;
    }

    const productDetailsDiv = document.getElementById('product-details');

    productDetailsDiv.innerHTML = `
        <h2>${product.name || 'No name available'}</h2>
        <img src="${product.image || 'placeholder.jpg'}" alt="${product.name || 'Product image'}">
        <p><strong>Description:</strong> ${product.description || 'No description available'}</p>
        <p><strong>Price:</strong> $${product.price || 'N/A'}</p>
        <p><strong>Category:</strong> ${product.category || 'No category available'}</p>
    `;
}
