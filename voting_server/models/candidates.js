const mongoose = require("mongoose");
const Joi = require("joi");

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 40
  },
  votes: {
    type: Number,
    default: 0
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

const Candidates = mongoose.model("candidate", candidateSchema);

function validate(candidate) {
  let schema = {
    name: Joi.string().min(1).max(40).required(),
    votes: Joi.number().integer().min(0).max(10000000000)
  };

  return Joi.validate(candidate, schema);
}

module.exports = { Candidates, validate };