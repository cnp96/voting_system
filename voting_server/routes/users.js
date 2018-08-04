const router = require("express").Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const {Users, validate} = require("../models/users");

// create new user
router.post("/signup", async (req, res, next) => {
  try {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
  } catch(e) { return res.status(400).send(e.message.split("[")[1].split("]")[0]); }

  let user = _.pick(req.body, ["name", "email", "password", "isAdmin"]);
  user.isAdmin = user.isAdmin || false;

  try {
    let salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  } catch(e) { return next(e); }

  new Users(user).save()
  .then(r => res.send(r))
  .catch(e => next(e));

});

module.exports = router;