document.getElementById('addProductForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    try {
        const response = await fetch('/products/createProduct', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to add product');
        }

        const result = await response.json();
        alert(result.message);
        this.reset();
    } catch (error) {
        console.error('Error:', error.message);
        alert(error.message);}
});
