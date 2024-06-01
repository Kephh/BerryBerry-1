import express from 'express';
import sellerComponents  from '../components/seller.components.js';
import productComponents from '../components/product.components.js';
import protectSellerRoute from '../middleware/protectSellerRoute.js';

const router = express.Router();

router.get('/dashboard/:sellerId', sellerComponents.dashboard);
router.post('/login', sellerComponents.login);
router.post('/register', sellerComponents.register);
router.post('/logout', protectSellerRoute, sellerComponents.logout);
router.post('/update/:sellerId', protectSellerRoute, sellerComponents.updateProfile);
router.post('/updatePassword/:sellerId', protectSellerRoute, sellerComponents.updatePassword);
router.post('/products/createProduct', productComponents.createProduct);
router.post('/products/updateProduct/:productId', productComponents.updateProduct);
router.post('/products/deleteProduct/:productId', productComponents.deleteProduct);

export default router;
