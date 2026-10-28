const express = require("express");
const characterRoutes = require('./routes/characterRoutes');
const rebelRoutes = require('./routes/rebelRoutes');
const logger = require('./middleware/logger');
const app = express()
app.use(express.json());
app.use(logger.logMethodAndUrl);

app.use('/characters', characterRoutes);
app.use('/rebel', rebelRoutes);

module.exports = app;
