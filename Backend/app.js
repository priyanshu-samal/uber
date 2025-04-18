// app.js
const dotenv = require('dotenv');
const connectToDb = require('./db/db');
dotenv.config();

const cookieParser = require('cookie-parser');

const express = require('express');
const app = express(); 
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
// Connect to MongoDB
connectToDb();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Test route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// API routes
app.use('/users', userRoutes);
app.use('/captains', captainRoutes);

module.exports = app;
