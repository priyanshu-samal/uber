// app.js
const dotenv = require('dotenv');
const connectToDb = require('./db/db');
dotenv.config();

const express = require('express');
const app = express(); // ✅ fixed typo (was: exress)

const cors = require('cors');
const userRoutes = require('./routes/user.routes');

// Connect to MongoDB
connectToDb();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// API routes
app.use('/users', userRoutes);

module.exports = app;
