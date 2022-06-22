'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

// Esoteric Resources
const errorHandler = require('./error-handlers/500');
const notFound = require('./error-handlers/404.js');
const authRoutes = require('./auth/router/index');

// Prepare the express app
const app = express();

const PORT = process.env.PORT || 3002;

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRoutes);

// Catchalls
app.use(notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  startup: () => {
    app.listen(PORT, () => {
      console.log(`Server Up on ${PORT}`);
    });
  },
};
