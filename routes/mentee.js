const router = require("express").Router();
const Mentee = require('../models/Mentee.model');
const Mentor = require ('../models/Mentor.model');
const Mentorship = require ('../models/Mentorship.model')

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

router.put('/mentee/mentor-list/:id/like', (req, res, next) => {
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
    // .populate('preferredMentors')
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      next(err)
    })
})

router.put('/mentee/mentor-list/:id/unlike', (req, res, next) => {
  // console.log(req.params)
  // console.log(req.body)
  // const { userId } = req.params.id 
  const { preferredMentor } = req.body

  Mentee.findByIdAndUpdate(req.params.id, { 
      $pull: {
        preferredMentors: preferredMentor
      }
    }, { new: true }
    )
    // .populate('preferredMentors')
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      next(err)
    })
})

router.put('/mentee/profile/:id/edit', (req, res, next) => {
  
  const { 
    firstName,
    lastName,
    age,
    nationality,
    contactDetails,
    website,
    requiredSupport,
    businessName,
    businessDescription,
    yearsOfOperation,
    sector,
    availableForNewMentorship,
    activeMentorship,
    availableFromDate,
    keyPersonalityTraits
  } = req.body;

  console.log('Step2', req.body)

  Mentee.findByIdAndUpdate(req.params.id, { 
    firstName,
    lastName,
    age,
    nationality,
    contactDetails,
    website,
    requiredSupport,
    businessName,
    businessDescription,
    yearsOfOperation,
    sector,
    availableForNewMentorship,
    activeMentorship,
    availableFromDate,
    keyPersonalityTraits
      }, { new: true })
    .then(mentee => {
      res.status(200).json(mentee)
    })
    .catch(err => {
      next(err)
    })
});

router.get('/mentee/my-mentorship/:id', (req, res, next) => {

  Mentorship.find({mentee: req.params.id})
    .populate('mentor')
    .populate('mentee')
    .then(mentorship => {
      console.log(mentorship, 'allMentorships')
      res.status(200).json(mentorship)
    })
    .catch(err => {
      next(err)
  })
})

router.put('/mentee/my-mentorship/:id', (req, res, next) => {
  console.log(req.body)
  const {newMessage, author} = req.body
  const id = req.params.id

  Mentorship.findByIdAndUpdate(id, {$push: {messages: {message: newMessage, author: author}}})
    // .populate('mentor')
    // .populate('mentee')
    .then(() => {
      Mentorship.find()
      .populate('mentor')
      .populate('mentee')
      .then((allMentorships) => res.send(allMentorships))      // console.log(mentorship, 'allMentorships')
      // res.status(200).json(mentorship)
    })
    .catch(err => {
      next(err)
  })
})

module.exports = router;