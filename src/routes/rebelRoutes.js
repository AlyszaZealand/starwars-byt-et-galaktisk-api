const express = require('express');
const router = express.Router();
const rebelController = require('../controllers/rebelController');

router.get('/download', rebelController.handleDownload);
router.get('/go-to-luke', rebelController.goToLuke)

module.exports = router;
