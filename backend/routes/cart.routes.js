import express from 'express';
import cartComponents from '../components/cart.components.js';
import protectRoute from '../middleware/protectRoute.js';
import path from 'path'; // Import the path module
import { getDirname } from './utils.js';

const router = express.Router();

const __dirname = getDirname();

router.get('/', async (req, res) => {
    try {
        const htmlPath = path.join(__dirname.slice(1), '..')+'/public/pages/cart.html';
        res.sendFile(htmlPath.replace(/\\/g, '/'));
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/viewPath',protectRoute , cartComponents.getCart);
router.post('/add/:productId',protectRoute , cartComponents.addToCart);
router.post('/remove/:productId',protectRoute, cartComponents.removeFromCart);
router.post('/clear',protectRoute, cartComponents.clearCart);

export default  router;
