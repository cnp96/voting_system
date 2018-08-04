const debug = require("debug")("voting:refreshToken");
const config = require("config");
const jwt = require("jsonwebtoken");
const {generateToken} = require("../models/users");

module.exports = function(req, res, next) {
    const token = req.header("x-auth-token");
    if(!token) return next();
    
    try {
        const decoded = jwt.verify(token, config.get("jwtPrivatekey"));
            const newToken = generateToken(decoded);
        debug("Token refreshed");
        res.header("x-auth-token", newToken).send(decoded);
    }
    catch(e) {
        delete req.user;
        debug("Redirecting to login route");
        next();
    }
    
}