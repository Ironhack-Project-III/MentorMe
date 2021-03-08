const router = require("express").Router();
//const DeutschConnect = require('../models/DeutschConnect.model');
const Mentee = require('../models/Mentee.model');
const Mentor = require('../models/Mentor.model');
const Mentorship = require('../models/Mentorship.model');



// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

//get all mentees for mentorship-overview
router.get('/deutschconnect/mentorships-overview', (req, res, next) => {

  Mentorship.find()
    .populate('mentor')
    .populate('mentee')
    .then(mentorship => {
      res.status(200).json(mentorship)
    })
    .catch(err => {
      next(err)
  })
})

//get Mentors and Mentees for create a new mentorship
router.get('/deutschconnect/mentorship-create', (req, res, next) => {

  Mentor.find()
    .then(mentors => {
      Mentee.find()
        .then(mentees => {
          console.log('mentorenTest', mentors)
          res.status(200).json({mentors, mentees})
      })
      
    })
    .catch(err => {
      next(err)
  })
})

//create new Mentorship entry
router.post('/deutschconnect/mentorship-create', (req, res, next) => {

  Mentorship.create({mentor, mentee, startDate, endDate, confirmed})
    .then(mentorship => {
      console.log('created new mentorship')
      res.status(200).json(mentorship)
    })
    .catch(err => {
      next(err)
  })
})

module.exports = router;