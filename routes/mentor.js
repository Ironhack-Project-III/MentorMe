const router = require("express").Router();
const Mentor = require('../models/Mentor.model');

router.get('/mentor/profile/:id', (req, res, next) => {
  Mentor.findById(req.params.id)
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

//update mentor profile

router.put('/mentor/profile/:id/edit', (req, res, next) => {
  
  const { 
    firstName,
    lastName,
    age,
    nationality,
    contactDetails,
    experience,
    industryExpertise,
    keySkills,
    keyPersonalityTraits,
    availableForNewMentorship,
    activelyMentoring,
    availableFromDate,
    imgPath
  } = req.body;

  Mentor.findByIdAndUpdate(req.params.id, { 
    firstName,
    lastName,
    age,
    nationality,
    contactDetails,
    experience,
    industryExpertise,
    keySkills,
    keyPersonalityTraits,
    availableForNewMentorship,
    activelyMentoring,
    availableFromDate,
    imgPath
      }, { new: true })
    .then(mentor => {
      res.status(200).json(mentor)
    })
    .catch(err => {
      next(err)
    })
});
  // if we don't have {new: true} findByIdAndUpdate() will return the old version of the mentor

  router.get('/mentor/my-mentorship/:id', (req, res, next) => {

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
  
  router.put('/mentor/my-mentorship/:id', (req, res, next) => {
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