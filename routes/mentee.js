const router = require("express").Router();
const Mentee = require('../models/Mentee.model');
const Mentor = require ('../models/Mentor.model')

router.get('/mentee/profile/:id', (req, res, next) => {
  Mentee.findById(req.params.id)
    .then(mentor => {
      if (!mentor) {
        res.status(404).json(mentor)
      } else {
        res.status(200).json(mentor)
      }
    })
    .catch(err => {
      next(err)
    })
});

//update mentee profile
router.put('/mentee/profile/:id', (req, res, next) => {
  const { firstName } = req.body;
  // if we don't have {new: true} findByIdAndUpdate() will return the old version of 
  // the project
  Mentee.findByIdAndUpdate(req.params.id, { firstName }, { new: true })
    .then(mentor => {
      res.status(200).json(mentor)
    })
    .catch(err => {
      next(err)
    })
});

//get all mentors
router.get('/mentee/mentor-list', (req, res, next) => {

  Mentor.find()
    .then(mentor => {
      res.status(200).json(mentor)
    })
    .catch(err => {
      next(err)
  })
})

module.exports = router;