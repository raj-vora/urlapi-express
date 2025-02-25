const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const knex = require('../services/db')

// Secret key for JWT (use environment variable in production)
const JWT_SECRET = 'your-secret-key'

// Register new user
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' })
        }

        // Check if user already exists
        const existingUser = await knex('users')
            .where({ username })
            .first()

        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' })
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Store user in database
        await knex('users').insert({
            username,
            password: hashedPassword
        })

        // Generate JWT token
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '24h' })

        res.status(201).json({
            message: 'User registered successfully',
            token
        })
    } catch (error) {
        console.error('Register error:', error)
        res.status(500).json({ message: 'Error registering user' })
    }
}

// Login user
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' })
        }

        // Check if user exists
        const user = await knex('users')
            .where('username', username)
            .first()
            console.log(user)
        if (!user) {
            return res.status(401).json({ message: 'New user, please register' })
        }

        // Verify password
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        // Generate JWT token
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '24h' })

        res.json({
            message: 'Login successful',
            token
        })
    } catch (error) {
        console.error('Login error:', error)
        res.status(500).json({ message: 'Error logging in' })
    }
}

