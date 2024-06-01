import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Define storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.resolve('backend/uploads');
        // Create the directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Initialize Multer with storage options
const upload = multer({ storage });

export default upload;
