// import express from 'express';
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import helmet from 'helmet';
// import cookieParser from 'cookie-parser';
// import expressSession from 'express-session';
// import connectMongo from 'connect-mongo'; // Import connect-mongo for session store

// // Import routes
// import productRoutes from './routes/product.routes.js';
// import userRoutes from './routes/user.routes.js';
// import cartRoutes from './routes/cart.routes.js';
// import messageRoutes from './routes/message.routes.js';
// // import adminRoutes from './routes/admin.routes.js';

// // Load environment variables from .env file
// dotenv.config();

// // Initialize Express app
// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cookieParser());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// // Create a new MongoStore instance
// // const MongoStore = connectMongo(expressSession);

// // Use express-session with connect-mongo as the session store


// app.use(helmet());

// // Routes
// app.use('/api/products', productRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/cart', cartRoutes);
// app.use('/api/messages', messageRoutes);
// // app.use('/api/admin', adminRoutes);

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


import { randomBytes } from 'crypto';

function generateJWTSecret(length) {
    // Generate random bytes
    const secretBytes = randomBytes(length);

    // Convert bytes to base64 string
    return secretBytes.toString('base64');
}

// Generate a 256-bit (32 bytes) JWT secret
const jwtSecret = generateJWTSecret(32);
console.log("JWT Secret:", jwtSecret);
