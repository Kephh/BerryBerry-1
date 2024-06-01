import express from 'express';
import searchComponents from '../components/search.components.js';
import Product from '../models/product.model.js';
import User from '../models/user.model.js';
import Seller from '../models/seller.model.js';
import path from 'path'; // Import the path module
import { getDirname } from './utils.js';    

const router = express.Router();

const __dirname = getDirname();

router.get('/', async (req, res) => {
    try {
        const htmlPath = path.join(__dirname.slice(1), '..')+'/public/pages/search.html';
        res.sendFile(htmlPath.replace(/\\/g, '/'));
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:type', async (req, res) => {
    try {
        const { type } = req.params;
        const query = req.query.query;
        let searchResults;

        switch (type) {
            case 'products':
                searchResults = await searchComponents.searchProductsByRegex(query);
                break;
            case 'users':
                searchResults = await searchComponents.searchUsersByRegex(query);
                break;
            case 'sellers':
                searchResults = await searchComponents.searchSellersByRegex(query);
                break;
            default:
                throw new Error('Invalid search type');
        }

        res.status(200).json(searchResults);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
