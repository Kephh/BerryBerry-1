import Message from '../models/message.model.js';

const getAllMessages = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming you have user information available in the request object
        // Fetch all messages for the user
        const messages = await Message.find({ $or: [{ sender: userId }, { recipient: userId }] });
        res.status(200).json({ messages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getMessagesWithUser = async (req, res) => {
    try {
        const userId = req.userId; // Assuming you have user information available in the request object
        const otherUserId = req.params.otherUserId;
        // console.log(userId, otherUserId);
        const messages = await Message.find({
            $or: [
                { sender: userId, receiver: otherUserId },
                { sender: otherUserId, receiver: userId }
            ]
        });
        res.status(200).json({ messages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
// const getMessagesWithSeller = async (req, res) => {
//     try {
//         const userId = req.user._id; // Assuming you have user information available in the request object
//         const otherUserId = req.params.sellerId;
//         // Fetch messages between the current user and the other user
//         const messages = await Message.find({
//             $or: [
//                 { sender: userId, receiver: otherUserId },
//                 { sender: otherUserId, receiver: userId }
//             ]
//         });
//         res.status(200).json({ messages });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

const sendMessage = async (req, res) => {
    try {
        const sender = req.userId; // Assuming you have user information available in the request object
        const receiver = req.params.otherUserId;
        const text = req.body.message;
        // Check if recipient is valid
        if (!receiver || typeof receiver !== 'string') {
            return res.status(400).json({ error: 'Invalid recipient' });
        }
        // Create a new message
        const message = new Message({ sender: sender, receiver, content: text });
        await message.save();
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// const deleteMessage = async (req, res) => {
//     try {
//         const userId = req.user._id; // Assuming you have user information available in the request object
//         const { messageId } = req.params;
//         // Find and delete the message
//         const message = await Message.findOneAndDelete({ _id: messageId, sender: userId });
//         if (!message) {
//             return res.status(404).json({ error: 'Message not found or you are not authorized to delete' });
//         }
//         res.status(200).json({ message: 'Message deleted successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

export default { getAllMessages, getMessagesWithUser, sendMessage };


