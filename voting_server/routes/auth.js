const router = require("express").Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { Users, loginValidate, generateToken } = require("../models/users");
const refreshToken = require("../middleware/refreshToken");
const jwt = require("jsonwebtoken");
const config = require("config");

// retrieve info
router.get("/retrieve", (req, res) => {
  const token = req.header("x-auth-token");
  if( !token ) return res.send({});
  const decoded = jwt.verify(token, config.get("jwtPrivatekey"));
  res.send(decoded);
});

// refresh token
router.get("/refresh", refreshToken, (req, res) => {
  res.header("x-auth-token", "").send(false);
});

// login user
router.post("/login", refreshToken, async (req, res) => {
  const { error } = loginValidate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  const user = await Users.findOne({email: req.body.email});
  if(!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if(!validPassword) return res.status(400).send("Invalid email or password");

  //const token = user.generateToken();
  const token = generateToken(user);
  res.header("x-auth-token", token).send(_.pick(user, ["name", "_id", "voted", "isAdmin"]));

});

module.exports = router;