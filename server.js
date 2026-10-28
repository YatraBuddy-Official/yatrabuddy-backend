const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB database
connectDB();

const app = express();

// 1. Security Headers & Parsers
app.use(helmet()); // Protects against common web vulnerabilities
app.use(cors());
app.use(express.json());

// 2. Rate Limiting Middleware (Blocks brute-force bot attacks & API abuse)
const { authLimiter, apiLimiter } = require('./middleware/securityMiddleware');
app.use('/api/auth', authLimiter);
app.use('/api/', apiLimiter);

// 3. Route files imports
const authRoutes = require('./routes/auth');
const tripRoutes = require('./routes/trips');
const spotRoutes = require('./routes/spots');
const userRoutes = require('./routes/userRoutes');

console.log('Loading auth routes...');
console.log('Loading spot routes...');
console.log('Loading trip routes...');
console.log('Loading user routes...');

// 4. Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/spots', spotRoutes);
app.use('/api/users', userRoutes);

console.log('All routes and security middleware loaded successfully!');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running securely on port ${PORT}`);
});