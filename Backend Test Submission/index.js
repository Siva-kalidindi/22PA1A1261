const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Router = require('./Routes/urlRoutes.js');
const dotenv = require('dotenv');
const logRequest = require('../Logging_Middleware/index.js');
dotenv.config();

app.use(express.json());
app.use('/', Router);

mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000');
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });


