const knex = require("../db")
const os = require("os");

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