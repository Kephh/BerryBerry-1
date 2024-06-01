import express from 'express';
import productComponents from '../components/product.components.js';
import path from 'path'; // Import the path module
import { getDirname } from './utils.js';

const router = express.Router();

const __dirname = getDirname();

router.get('/', async (req, res) => {
    try {
        const htmlPath = path.join(__dirname.slice(1), '..')+'/public/pages/home.html';
        res.sendFile(htmlPath.replace(/\\/g, '/'));
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/data', async (req, res) => {
    try {
        const products = await productComponents.getAllProducts();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
