const debug = require("debug")("voting:db");
const mongoose = require("mongoose");
const Fawn = require("fawn");
const winston = require("winston");
const config = require("config");

module.exports = function() {
    // Database configuration
    debug("Connecting to MongoDB...");
    winston.info("Connecting to MongoDB");            
    mongoose.connect(config.get("db.host"), {
      useNewUrlParser: true,
      user: config.get("db.user"),
      pass: config.get("db.password"),    
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000    
    })
    .then(() => {
        winston.info("Connected to MongoDB");            
        debug("Connected to MongoDB...");

        Fawn.init(mongoose); // Init transaction control
        winston.info("Instantiated Fawn");
        debug("Instantiated transaction control :: Fawn");
    });
}