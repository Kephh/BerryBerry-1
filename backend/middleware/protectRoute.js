import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
    try {
        // Extract token from cookies
        const token = req.cookies.jwt;

        // Check if token exists
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized 1' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if token is valid
        if (!decoded) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Extract user ID from token
        const userId = decoded.userId;

        // Optionally, fetch user data from the database if needed
        const user = await User.findById(userId);

        // Pass user data or user ID to the next middleware or route handler
        req.userId = userId;
        req.user = user; // If user data is needed in subsequent middleware

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Middleware error", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default protectRoute;
