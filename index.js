// Import necessary modules: express, mongoose, routes
// Configure dotenv to load environment variables
// Initialize Express app
// Set up middlewares: JSON body-parser, CORS
// Mount routes: /api/auth, /api/foods, /api/orders
// Connect to MongoDB using mongoose with connection string from .env
// Add a global error handler
// Start the server and listen on a specific port

import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import foodRoutes from './routes/foodRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { connectDB } from './utils/connectDB.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

connectDB();

app.use('/auth', authRoutes);
app.use('/foods', foodRoutes);
app.use('/orders', orderRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});