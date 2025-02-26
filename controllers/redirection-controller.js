// url/server/controllers/redirection-controller.js

const knex = require('../services/db')
const findLongUrl = require('../services/url-service').findLongUrl;

exports.routeOne = async (req, res) => {
    const code = req.params.code;

    const link = await findLongUrl(code);
    console.log(link);

    if (link) {
        return res.json({ message: "success", url: link.url });
    } else {
        res.json({ message: "failure", url: 'https://raj-vora.github.io' });
    }
}