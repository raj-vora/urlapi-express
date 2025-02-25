// url/server/routes/links-route.js

// Import express
const express = require('express')

// Import links-controller
const linksRoutes = require('../controllers/links-controller.js')

// Create router
const router = express.Router()

// Add route for GET request to retrieve all book
// In server.js, links route is specified as '/links'
// this means that '/all' translates to '/links/all'
router.get('/all/:username', linksRoutes.linksAll)

// Add route for GET request to retrieve all book
// In server.js, links route is specified as '/links'
// this means that '/all' translates to '/links/all'
router.get('/:code', linksRoutes.linksOne);

// Add route for POST request to create new book
// In server.js, links route is specified as '/links'
// this means that '/create' translates to '/links/create'
router.post('/create', linksRoutes.linksCreate)

// Add route for PUT request to delete specific book
// In server.js, links route is specified as '/links'
// this means that '/delete' translates to '/links/delete'
router.put('/delete', linksRoutes.linksDelete)

// Add route for PUT request to reset linkshelf list
// In server.js, links route is specified as '/links'
// this means that '/reset' translates to '/links/reset'
router.put('/reset', linksRoutes.linksReset)

// Export router
module.exports = router