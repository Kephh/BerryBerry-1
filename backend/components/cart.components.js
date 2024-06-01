import Cart from '../models/cart.model.js';

const getCart = async (req, res) => {
    try {
        // Fetch the user's cart from the database
        const userId = req.userId; // Assuming you have user information available in the request object
        const cart = await Cart.findOne({ user: userId }).populate('items.product');
        res.status(200).json({ cart });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addToCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user._id;
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }
        const existingItemIndex = cart.items.findIndex(item => item.product == productId);
        if (existingItemIndex !== -1) {
            cart.items[existingItemIndex].quantity++;
        } else {
            cart.items.push({ product: productId, quantity: 1 });
        }
        await cart.save();
        res.status(200).json({ message: 'Product added to cart successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user._id;
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        cart.items = cart.items.filter(item => item.product != productId);
        await cart.save();
        res.status(200).json({ message: 'Product removed from cart successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const clearCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOneAndDelete({ user: userId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default { getCart, addToCart, removeFromCart, clearCart };
