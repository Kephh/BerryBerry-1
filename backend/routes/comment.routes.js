import express from 'express';
const router = express.Router();
import commentComponents from '../components/comment.components.js';

router.get('/products/:productId/comments', commentComponents.getCommentsByProduct);
router.post('/products/:productId/comments/create', commentComponents.createComment);
router.post('/products/:productId/comments/:commentId/delete', commentComponents.deleteComment);

export default router;
