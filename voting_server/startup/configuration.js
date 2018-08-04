const debug = require("debug")("voting:config");
const config = require("config"); // for configuration management

module.exports = function(app) {
    // Configuration
    try {
        const env = app.get("env");
        debug("Running Environment:", env);
        debug("DB Server:", config.get("db.host"));
        debug("DB Uset:", config.get("db.user"));
        debug("DB Password:", config.get("db.password"));
        debug("jwtPrivatekey: ", config.get("jwtPrivatekey"));
    } catch(e) {
        debug("FATAL", e.message);
        process.exit(1);
    }
}