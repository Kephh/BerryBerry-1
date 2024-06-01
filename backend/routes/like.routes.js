import express from 'express';
const router = express.Router();
import likeComponents from '../components/like.components.js';

router.post('/:productId/like', likeComponents.likeProduct);
router.post('/:productId/unlike', likeComponents.unlikeProduct);

export default router;
