const debug = require("debug")("voting:err");
const winston = require("winston");

module.exports = function (err, req, res, next) {
    // Log error to file
    winston.error(err.message, err);
    // error, warn, info, verbose. debug, silly
    
    // Log to console
    debug("Error Occurred:", err.message);
    
    if(err.code == 11000) return res.status(400).send(err.customMsg || "Duplicate entry");
    
    res.status(500).send("Something went wrong. Please try after sometime.");
}