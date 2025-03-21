require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')

// Import routes
var linksRouter = require('../routes/links-route');
var redirectionRouter = require('../routes/redirection-route');
var userRouter = require('../routes/users-route');

function checkAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
}

// Apply middleware
// Note: Keep this at the top, above routes
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/user', userRouter);
const { health } = require('../controllers/health-controller');
app.get('/health', health);

app.use(checkAuth);


// Implement routes
app.use('/redirect', redirectionRouter);
app.use('/links', linksRouter);

// Implement 500 error route
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something is broken.')
})

// Implement 404 error route
app.use(function (req, res, next) {
    res.status(404).send('Sorry we could not find that.')
})

// Start express app
// app.listen(3000, function () {
//     console.log(`Server is running on:3000`)
// })

module.exports = app;
