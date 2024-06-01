import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from 'url'; // Import fileURLToPath function
import { dirname, join } from 'path'; // Import dirname and join functions
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import expressSession from 'express-session';
import path from 'path';

import connectToMongoDB from "./db/connectToMongoDB.js";
import userRoutes from './routes/user.routes.js';
import sellerRoutes from './routes/seller.routes.js';
import cartRoutes from './routes/cart.routes.js';
import productRoutes from './routes/product.routes.js';
import messageRoutes from './routes/message.routes.js';
import searchRoutes from "./routes/search.routes.js";
import protectRoute from "./middleware/protectRoute.js";
import homeRoutes from "./routes/home.routes.js";
import protectSellerRoute from "./middleware/protectSellerRoute.js";

dotenv.config();

const PORT = 5500;
const app = express();

// Convert file URL to file path
const __filename = fileURLToPath(import.meta.url);
// Derive directory path
const __dirname = dirname(__filename);

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({
    secret: process.env.SESSION_SECRET || 'your_session_secret',
    resave: false,
    saveUninitialized: false
}));

// Serve static files from the 'public' directory
app.use(express.static(join(__dirname, 'public')));

// console.log(path.join(__dirname, '../uploads/products'));


app.use('/uploads', express.static(path.join(__dirname, 'backend/uploads')));

// Routes
app.get('/', (req, res) => {
    res.redirect('/home');
});

// Reordered routes for clarity
app.use('/home', homeRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/cart', protectRoute, cartRoutes);
app.use('/messages', protectRoute || protectSellerRoute, messageRoutes);
app.use('/seller', sellerRoutes);
app.use('/search', searchRoutes); // Placed at the end for less-specific matching

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message }); // Sending more specific error message
});

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`);
});
