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

router.put('/mentee/mentor-list/:id', (req, res, next) => {
  // console.log(req.params)
  // console.log(req.body)
  // const { userId } = req.params.id 
  const { preferredMentor } = req.body

  Mentee.findByIdAndUpdate(req.params.id, { 
      $push: {
        preferredMentors: preferredMentor
      }
    }, { new: true }
    )
    .populate('preferredMentors')
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      next(err)
    })
})

module.exports = router;