import express from 'express';
import productComponents from '../components/product.components.js';
import likeComponents from '../components/like.components.js';
import protectRoute from '../middleware/protectRoute.js';
import commentComponents from '../components/comment.components.js';
import upload from '../middleware/multer.config.js';
import path from 'path'; // Import the path module
import { getDirname } from './utils.js';


const __dirname = getDirname();
const router = express.Router();

router.get('/create', async (req, res) => {
    try {
        const htmlPath = path.join(__dirname.slice(1), '..')+'/public/pages/addProduct.html';
        res.sendFile(htmlPath.replace(/\\/g, '/'));
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/view/:productId', async (req, res) => {
    try {
        const htmlPath = path.join(__dirname.slice(1), '..')+'/public/pages/product.html';
        res.sendFile(htmlPath.replace(/\\/g, '/'));
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})


router.get('/', productComponents.getAllProducts);
router.get('/viewPath/:productId', productComponents.getProductById);


router.post('/createProduct', upload.single('image'), productComponents.createProduct);

router.post('/updateProduct/:productId',upload.single('image') , productComponents.updateProduct);
router.post('/deleteProduct/:productId', productComponents.deleteProduct);

router.post('/like/:productId', protectRoute, likeComponents.likeProduct);
router.post('/unlike/:productId', protectRoute, likeComponents.unlikeProduct);

router.get('/:productId/comments', protectRoute, commentComponents.getCommentsByProduct);
router.post('/:productId/comments/create', protectRoute, commentComponents.createComment);
router.post('/:productId/comments/:commentId/delete', protectRoute, commentComponents.deleteComment);

export default router;
