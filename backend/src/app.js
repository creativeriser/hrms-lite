const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middlewares/errorHandler');
const routes = require('./routes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true
}));

// Routes
app.use('/api', routes);

// Error Handler
app.use(errorHandler);

module.exports = app;
