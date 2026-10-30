const express = require("express");
const characterRoutes = require('./routes/characterRoutes');
const rebelRoutes = require('./routes/rebelRoutes');
const logger = require('./middleware/logger');
const path = require("path");
const app = express()
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(logger.logMethodAndUrl);

app.use('/characters', characterRoutes);
app.use('/rebel', rebelRoutes);

module.exports = app;
