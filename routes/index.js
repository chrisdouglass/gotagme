// Manages all routes.

const express = require('express');
const router = express.Router();

// All API routes.
const api = require('./api');
router.use('/api', api);

module.exports = router;
