// url/server/routes/redirection-route.js

// Import express
const express = require('express')

// Import links-controller
const redirectionController = require('../controllers/redirection-controller.js')
const { health } = require('../controllers/redirection-controller.js');

// Create router
const router = express.Router()

// Add route for GET request to retrieve all book
// In server.js, redirection route is specified as '/redirection'
// this means that '/:code' translates to '/redirection/:code'
router.get('/:code', redirectionController.routeOne)


// Export the router
module.exports = router