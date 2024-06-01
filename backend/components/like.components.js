import Like from '../models/like.model.js';
import Product from '../models/product.model.js';

const likeProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user._id; // Assuming you have user information available in the request object
        // Check if the user has already liked the product
        const existingLike = await Like.findOne({ product: productId, user: userId });
        if (existingLike) {
            return res.status(400).json({ error: 'User has already liked the product' });
        }
        // Create a new like
        const like = new Like({ product: productId, user: userId });
        await like.save();
        // Update the product's like count
        const product = await Product.findById(productId);
        product.likesCount++;
        await product.save();
        res.status(201).json({ message: 'Product liked successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const unlikeProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user._id; // Assuming you have user information available in the request object
        // Find and delete the like
        const deletedLike = await Like.findOneAndDelete({ product: productId, user: userId });
        // Update the product's like count
        const product = await Product.findById(productId);
        product.likesCount--;
        await product.save();
        if (!deletedLike) {
            return res.status(404).json({ error: 'Like not found or you are not authorized to unlike' });
        }
        res.status(200).json({ message: 'Product unliked successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default { likeProduct, unlikeProduct };
