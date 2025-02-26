// url/server/routes/health-route.js

// Import express
const express = require('express')

// Import links-controller
const { health } = require('../controllers/health-controller.js');

// Create router
const router = express.Router()

router.get('/health', health);