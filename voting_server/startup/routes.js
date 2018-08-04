const debug = require("debug")("voting:routes");

// Routes
const authRoute = require("../routes/auth");
const candidateRoute = require("../routes/candidates");
const userRoute = require("../routes/users");

// Middlewares
const errorHandler = require("../middleware/errors");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

module.exports = function (app) {

  // Enable CORS: Cross Origin Resource Sharing
  app.use(cors());
  app.all("*",(req, res, next) => {
    res.header("Access-Control-Expose-Headers", "x-auth-token");
    next();
  });

  // Middlewares
  app.use(helmet()); //protect http routes
  app.use(express.json()); // parse json from body

  // Handling JSON parse error in req.body
  app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.type == "entity.parse.failed") {
      return res.status(400).send("Invalid payload.");
    }
    next();
  });

  // parse incoming requests with urlencoded payloads
  app.use(express.urlencoded({ extended: true }));

  if (app.get("env") == "development") {
    app.use(morgan('[:date] :remote-addr ":method :url HTTP/:http-version" :status'));
    debug("Morgan started in development server...");
  }

  // Setting up routes
  app.use("/auth", authRoute);
  app.use("/candidates", candidateRoute);
  app.use("/users", userRoute);
  app.all("*", (req, res) => {
    res.status(404).send("Invalid endpoint");
  });
  
  // Global error handler
  app.use(errorHandler);

}