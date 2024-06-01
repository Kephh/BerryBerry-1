import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import Seller from '../models/seller.model.js';
import Product from '../models/product.model.js';

const dashboard = async (req, res) => {
    try {
        const sellerId = req.params.sellerId; // Assuming you have middleware to extract user information

        // Retrieve seller's information
        const seller = await Seller.findById(sellerId);

        // Fetch products related to the seller
        const products = await Product.find({ seller: sellerId });

        // Count the number of products
        const totalProducts = products.length;

        // Construct the dashboard object with relevant data
        const dashboardData = {
            seller: {
                name: seller.name,
                email: seller.email,
                username: seller.username,
            },
            products: {
                total: totalProducts,
            },
        };

        // Respond with the dashboard data
        res.status(200).json({ dashboard: dashboardData });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const register = async (req, res) => {
    try {
        // Validate input fields
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, username, email, password } = req.body;

        // Check if the username is already taken    
        const existingSeller = await Seller.findOne({ username });
        if (existingSeller) {
            return res.status(400).json({ error: 'Username is already taken' });
        }   

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new seller
        const newSeller = new Seller({ name, username, email, password: hashedPassword });
        await newSeller.save();

        res.status(201).json({ message: 'Seller registered successfully' });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const seller = await Seller.findOne({ username });

        if (!seller) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        if (!seller.password) {
            return res.status(401).json({ error: 'User password not found' });
        }

        const passwordMatch = await bcrypt.compare(password, seller.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign({ sellerId: seller._id }, process.env.JWT_SECRET);

        res.cookie('jwt', token, {
            httpOnly: true,
            // Other cookie options if needed (e.g., maxAge, secure, domain, etc.)
        });
        res.send("Login successful");
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const logout = async (req, res) => {
    try {
        // Clear JWT token from client-side (if stored in cookies)
        res.clearCookie('jwt', { expires: new Date(0), path: '/' });
        console.log('Token cookie cleared');

        // Optionally: Redirect or respond with logout successful message
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getProfile = async (req, res) => {
    try {
        const sellerId = req.params.sellerId;
        const seller = await Seller.findById(sellerId).select('-password');
        if (!seller) {
            return res.status(404).json({ error: 'Seller not found' });
        }
        res.status(200).json(seller);
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateProfile = async (req, res) => {
    try {
        console.log(req.params.sellerId);
        const sellerId = req.params.sellerId; // Assuming you have middleware to extract user information
        const { name, username, email, gender } = req.body;
        const updatedFields = { name, username, email, gender };
        
        console.log(req.params.sellerId);
        // Ensure sellerId is in the correct format
        if (!mongoose.isValidObjectId(sellerId)) {
            return res.status(400).json({ error: 'Invalid seller ID format' });
        }



        const updatedSeller = await Seller.findByIdAndUpdate(
            sellerId,
            updatedFields,
            { new: true }
        ).select('-password');

        if (!updatedSeller) {
            return res.status(404).json({ error: 'Seller not found' });
        }

        res.status(200).json(updatedSeller);
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const updatePassword = async (req, res) => {
    try {
        const sellerId = req.params.sellerId;
        const { oldPassword, newPassword } = req.body;
        const seller = await Seller.findById(sellerId);
        if (!seller) {
            return res.status(404).json({ error: 'Seller not found' });
        }

        const passwordMatch = bcrypt.compare(oldPassword, seller.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        seller.password = hashedPassword;
        await seller.save();
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Update password error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



export default { dashboard, login, register, logout, getProfile, updateProfile, updatePassword };
