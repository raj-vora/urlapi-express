// url/server/controllers/redirection-controller.js

const knex = require('./../db')
const findLongUrl = require('../services/url-service').findLongUrl;
const os = require("os");

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

exports.health = async (req, res) => {
    const healthCheck = {
        uptime: process.uptime(),
        message: "OK",
        timestamp: Date.now(),
        memoryUsage: process.memoryUsage(),
        cpuLoad: os.loadavg()
    };

    try {
        await knex.raw("select 1+1 as result").then(
            (exists) => {
                if (exists) {
                    healthCheck.database = "Connected";
                }
            }
        )
    } catch (error) {
        healthCheck.database = "Disconnected";
        return res.status(500).json({ status: "fail", ...healthCheck });
    }
    console.log(healthCheck.uptime);
    res.status(200).json({ status: "ok", ...healthCheck });
}