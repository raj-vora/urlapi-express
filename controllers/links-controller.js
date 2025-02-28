// url/server/controllers/links-controller.js

// Import database
const knex = require('../services/db');
const { radix64toint } = require('../services/radix64-service');
const {
    createCustomShortCode,
    createRandomShortCode,
    findLongUrl
} = require('../services/url-service');

// Retrieve all links
exports.linksAll = async (req, res) => {
    // Get all links from database
    knex
        .column('author', 'code', 'url', 'clicks')
        .from('links') // from 'links' table
        .where('author', req.params.username) // select all records
        .then(userData => {
            console.log(userData)
            // Send links extracted from database in response
            res.json(userData)
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving links: ${err}` })
        })
}

exports.linksOne = async (req, res) => {
    const code = req.params.code;

    const url = await findLongUrl(code);
    if (url) {
        res.json({ message: "success", "url": url });
    } else {
        res.status(404).json({ error: "no such shortcode created" });
    }
}

// Create new URL
exports.linksCreate = async (req, res) => {
    // Add new URL to database
    const url = req.body.url;
    const code = req.body.code;
    const author = req.body.author;

    if (!code) {
        const link = await createRandomShortCode(author, url);
        console.log(link);
        res.json({ message: "success", url: encodeURIComponent(link.url), code: link.code });
    }

    try {
        const link = await createCustomShortCode(author, code, url);
        console.log(link);
        res.json({ message: "success", url: encodeURIComponent(link.url), code: link.code });
    } catch (e) {
        console.log(e);
        return res.status(400).json({ error: e.message });
    }
}

// Remove specific URL
exports.linksDelete = async (req, res) => {
    // Find specific URL in the database and remove it
    console.log(req.body);
    id = radix64toint(req.body.code);
    knex('links')
        .where('id', id) // find correct record based on id
        .del() // delete the record
        .then((code) => {
            // Send a success message in response
            console.log(code);
            res.json({ message: `URL ${req.body.code} deleted.` })
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error deleting ${req.body.id} URL: ${err}` })
        })
}

// Remove all links on the list
exports.linksReset = async (req, res) => {
    // Remove all links from database
    knex
        .select('*') // select all records
        .from('links') // from 'links' table
        .truncate() // remove the selection
        .then(() => {
            // Send a success message in response
            res.json({ message: 'URL list cleared.' })
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error resetting URL list: ${err}.` })
        })
}