const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middlewares/errorHandler');
const routes = require('./routes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()); // Allow all origins for simplicity (or add your Vercel URL later)

// Routes
app.use('/api', routes);

// Error Handler
app.use(errorHandler);

module.exports = app;
