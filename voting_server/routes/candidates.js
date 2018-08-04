const router = require("express").Router();
const _ = require("lodash");
const Fawn = require("fawn");
const {Candidates, validate} = require("../models/candidates");
const {Votes, validateVote} = require("../models/votes");
const {Users} = require("../models/users");

const admin = require("../middleware/isAdmin");
const auth = require("../middleware/auth");

// get candidate names: normal user
router.get("/", auth, (req, res, next) => {
  const selection = req.user.isAdmin ? "name votes" : "name";
  Candidates.find().select(selection)
  .then(r => {
    console.log(r); 
    res.json(r) })
  .catch(e => next(e));
});

// Get my vote info
router.get("/vote", auth, (req, res, next) => {
  const id = req.user._id;
  Votes.findOne({user: id}).select("candidate")
  .then(r => res.send(r))
  .catch(e => next(e));
});

// vote a candidate
router.put("/vote/:id", auth, (req, res, next) => {
  const {error} = validateVote({user: req.user._id, candidate: req.params.id});
  if(error) return res.status(400).send("No such candidate");
  
  // Add record in Votes, update vote count in candidates, voted status in users
  Fawn.Task()
  .save(Votes, {user: req.user._id, candidate: req.params.id})
  .update(Candidates, {_id: req.params.id}, {$inc: {"votes": 1}})
  .update(Users, {_id: req.user._id}, {$set: {hasVoted: true} })
  .run({useMongoose: true})
  .then(r => res.send(r[0]) )
  .catch(e => next(e));

});

// add a new candidate
router.post("/", [auth, admin], (req, res, next) => {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const candidate = _.pick(req.body, ["name"]);
  new Candidates(candidate).save()
  .then(r => res.json(_.pick(r, ["name", "votes", "_id"])))
  .catch(e => next(e)); 

});

router.delete("/:id", [auth, admin], (req, res, next) => {
  Candidates.findByIdAndRemove(req.params.id)
  .then(r => res.send(true))
  .catch(e => next(e));
});

module.exports = router;