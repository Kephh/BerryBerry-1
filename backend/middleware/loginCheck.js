// loginCheck.js
import jwt from 'jsonwebtoken';

const loginCheck = (req, res, next) => {
    // Check if the user is already authenticated
    try {
        const token = req.cookies.jwt;

        // Check if token exists
        if (!token) {
            next();
        } else {
            res.redirect('/home');
        }
    } catch (error) {
        
        console.error('Login check error:', error);
        res.status(500).json({ error: 'Internal server error' });
        
    }
};

export default loginCheck;
