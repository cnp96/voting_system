const mongoose = require("mongoose");
const Joi = require("joi");

const voteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    unique: true
  },
  candidate: {
    type: mongoose.Schema.ObjectId,
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

const Votes = mongoose.model("vote", voteSchema);

function validateVote(vote) {
  let schema = {
    user: Joi.objectId().required(),
    candidate: Joi.objectId().required()
  };

  return Joi.validate(vote, schema);
}

module.exports = { Votes, validateVote };