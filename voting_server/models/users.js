const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const debug = require("debug")("voting:usersModel");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 40
  },
  voted: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 60,
    required: true,
    unique: true    
  },
  password: {
    type: String,
    required: true    
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  updatedOn: {
    type: Date,
    default: Date.now
  }
});

const Users = mongoose.model("users", usersSchema);

//usersSchema.methods.generateToken = function() {
function generateToken(user){  
const token = jwt.sign({_id: user._id, isAdmin: user.isAdmin, name: user.name, voted: user.voted}, config.get("jwtPrivatekey"), {expiresIn: "1h"});
  return token;
}

function validate(user) {
  let schema = {
    name: Joi.string().min(1).max(40).required(),
    voted: Joi.boolean(),
    email: Joi.string().email().min(5).max(60).required(),
    password: Joi.string().required(),
    isAdmin: Joi.boolean()
  };

  return Joi.validate(user, schema);
}

function loginValidate(user) {
  let schema = {
    email: Joi.string().email().min(5).max(60).required(),
    password: Joi.string().required()
  };

  return Joi.validate(user, schema);
}

module.exports = { Users, validate, loginValidate, generateToken };