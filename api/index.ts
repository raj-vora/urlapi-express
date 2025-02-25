require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')

// Import routes
var linksRouter = require('./routes/links-route');
var redirectionRouter = require('./routes/redirection-route');
var userRouter = require('./routes/users-route');

// Apply middleware
// Note: Keep this at the top, above routes
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    if (!req.path.includes('/user') && !req.path.includes('health') && !req.headers.authorization) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
});


// Implement routes
app.use('/links', linksRouter);
app.use('/redirect', redirectionRouter);
app.use('/user', userRouter);

// Implement 500 error route
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something is broken.')
})

// Implement 404 error route
app.use(function (req, res, next) {
    res.status(404).send('Sorry we could not find that.')
})

// // Start express app
// app.listen(3000, function () {
//     console.log(`Server is running on:3000`)
// })

module.exports = app;
