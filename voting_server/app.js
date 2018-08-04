const debug = require("debug")("voting:app");

const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");

const app = express();

// Initialize Logger
debug("Loading Logger...");
require("./startup/logging")();
debug("Loaded Logger");

// Load configurations: Fail => FATAL Exit
debug("Loading Configurations...");
require("./startup/configuration")(app);
debug("Loaded Configurations");

// Connect to db: Mongoose and Fawn
debug("Loding database configurations...");
require("./startup/database")();
debug("Loaded database configurations");

// Add routes and middlewares
debug("Setting up routes...");
require("./startup/routes")(app);
debug("Setup Routes");

const port = process.env.PORT || 3001;
app.listen(port, () => debug("Server started at",port));