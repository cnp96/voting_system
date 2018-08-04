const winston = require("winston");

module.exports = function() {

    // Initialize Logger
    winston.add(winston.transports.File, {filename: "voting.log"});
    winston.handleExceptions( new winston.transports.File({filename: "uncaughtExceptions.log"}) );
    
    // Handle unhandled rejection through process
    process.on("unhandledRejection", ex => { throw ex; });
    
}