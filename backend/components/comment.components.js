import Comment from '../models/comment.model.js';

const getCommentsByProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        // Fetch comments for a product
        const comments = await Comment.find({ product: productId });
        res.status(200).json({ comments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createComment = async (req, res) => {
    try {
        const { productId } = req.params;
        const { text } = req.body;
        const userId = req.user._id; // Assuming you have user information available in the request object
        const comment = new Comment({ product: productId, user: userId, text });
        await comment.save();
        res.status(201).json({ message: 'Comment created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user._id; // Assuming you have user information available in the request object
        // Find the comment by ID and user to ensure the user is authorized to delete it
        const comment = await Comment.findOneAndDelete({ _id: commentId, user: userId });
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found or you are not authorized to delete' });
        }
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default { getCommentsByProduct, createComment, deleteComment };
