import express from 'express';
const router = express.Router();
import messageComponents from '../components/message.components.js';
import protectRoute from '../middleware/protectRoute.js';
import path from 'path';
import { getDirname } from './utils.js';

const __dirname = getDirname();

// Routes to serve HTML pages
router.get('/', (req, res) => {
    const htmlPath = path.join(__dirname.slice(1), '..')+'/public/pages/messageList.html';
    res.sendFile(htmlPath.replace(/\\/g, '/'));
});

router.get('/:otherUserId', (req, res) => {
    const htmlPath = path.join(__dirname.slice(1), '..')+'/public/pages/individualMessages.html';
    res.sendFile(htmlPath.replace(/\\/g, '/'));
});

// API routes
router.get('/all', protectRoute, messageComponents.getAllMessages);

router.get('/getPath/:otherUserId', protectRoute, messageComponents.getMessagesWithUser);

router.post('/sendPath/:otherUserId', protectRoute, messageComponents.sendMessage);


// router.get('/api/seller/:otherUserId', protectRoute, messageComponents.getMessagesWithSeller);

// Uncomment and implement deleteMessage in messageComponents if needed
// router.post('/api/messages/:messageId/delete', protectRoute, messageComponents.deleteMessage);

export default router;
