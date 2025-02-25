// url/server/routes/health-route.js

// Import express
const express = require('express')

const healthController = require('../controllers/health-controller');

// Create router
const router = express.Router()

router.get('/health', healthController.health);

module.exports = router