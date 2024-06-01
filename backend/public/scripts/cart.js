window.onload = async function() {
    const cartItemsContainer = document.getElementById('cart-items');

    // Fetch cart items and populate the list
    try {
        const cartItems = await fetchCartItems(); // Fetch cart items from server
        displayCartItems(cartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        // Display error message on the page
        cartItemsContainer.innerHTML = 'Error fetching cart items. Please try again later.';
    }

    // Add event listener for remove from cart button
    cartItemsContainer.addEventListener('click', async function(event) {
        if (event.target.classList.contains('remove-from-cart')) {
            const itemId = event.target.dataset.itemId;
            try {
                await removeFromCart(itemId); // Remove item from cart on server
                const updatedCartItems = await fetchCartItems(); // Fetch updated cart items
                displayCartItems(updatedCartItems); // Display updated cart items
            } catch (error) {
                console.error('Error removing item from cart:', error);
                // Display error message on the page
                cartItemsContainer.innerHTML = 'Error removing item from cart. Please try again later.';
            }
        }
    });
};

async function fetchCartItems() {
    try {
        const response = await fetch('/cart/viewPath'); // Fetch cart items from server
        if (!response.ok) {
            throw new Error('Failed to fetch cart items');
        }
        const cartItems = await response.json();
        console.log(cartItems);
        return cartItems;
    } catch (error) {
        throw new Error('Error fetching cart items:', error);
    }
}

function displayCartItems(cartItems) {
    // Clear the existing cart items
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    // Check if cartItems is an array
    if (!Array.isArray(cartItems)) {
        // If cartItems is not an array, display an error message
        const listItem = document.createElement('li');
        listItem.textContent = 'No items in cart';
        cartItemsContainer.appendChild(listItem);
        return;
    }

    // Display each cart item in the list
    cartItems.forEach(item => {
        const listItem = createCartItemElement(item);
        cartItemsContainer.appendChild(listItem);
    });
}


function createCartItemElement(item) {
    // Create a list item for the cart item
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <span>${item.name} - $${item.price}</span>
        <button class="remove-from-cart" data-item-id="${item.id}">Remove from Cart</button>
    `;
    return listItem;
}

async function removeFromCart(itemId) {
    try {
        const response = await fetch(`/cart/remove/${itemId}`, {
            method: 'POST'
        });
        if (!response.ok) {
            throw new Error('Failed to remove item from cart');
        }
    } catch (error) {
        throw new Error('Error removing item from cart:', error);
    }
}
