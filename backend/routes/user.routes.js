import express from 'express';
import path from 'path'; // Import the path module
import userComponents from '../components/user.components.js';
import protectRoute from '../middleware/protectRoute.js';
import loginCheck from '../middleware/loginCheck.js';
import cors from 'cors';
import { getDirname } from './utils.js';

const router = express.Router();
cors();

const __dirname = getDirname();

router.get('/login', loginCheck, (req, res) => {
   const htmlPath = path.join(__dirname.slice(1), '..') + '/public/pages/login.html';
   res.sendFile(htmlPath.replace(/\\/g, '/'));
});

router.get('/signup', loginCheck, (req, res) => {
   const htmlPath = path.join(__dirname.slice(1), '..')+'/public/pages/signup.html';
   res.sendFile(htmlPath.replace(/\\/g, '/'));
});

router.get('/account', (req, res) => {
   const htmlPath = path.join(__dirname.slice(1), '..')+'/public/pages/profile.html';
   res.sendFile(htmlPath.replace(/\\/g, '/'));
});
router.get('/:otherUserId', (req, res) => {
   const htmlPath = path.join(__dirname.slice(1), '..')+'/public/pages/userProfile.html';
   res.sendFile(htmlPath.replace(/\\/g, '/'));
});

router.get('/update', (req, res) => {
   const htmlPath = path.join(__dirname.slice(1), '..')+'/public/pages/updateProfile.html';
   res.sendFile(htmlPath.replace(/\\/g, '/'));
});

router.get('/updatePassword', (req, res) => {
   const htmlPath = path.join(__dirname.slice(1), '..')+'/public/pages/updatePassword.html';
   res.sendFile(htmlPath.replace(/\\/g, '/'));
});


router.post('/signupPath', userComponents.signup);
router.post('/loginPath', userComponents.login);
router.post('/logoutPath', protectRoute, userComponents.logout);
router.get('/profilePath', protectRoute, userComponents.getProfile);
router.get('/path/:otherUserId', userComponents.getOtherProfile);
router.post('/updateProfilePath', protectRoute, userComponents.updateProfile);
router.post('/updatePasswordPath', protectRoute, userComponents.updatePassword);

export default router;
