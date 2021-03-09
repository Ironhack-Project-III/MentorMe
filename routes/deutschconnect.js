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
      console.log(mentorship, 'allMentorships')
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
          res.status(200).json({mentors, mentees})
      })
      
    })
    .catch(err => {
      next(err)
  })
})

//create new Mentorship entry
router.post('/deutschconnect/mentorship-create', (req, res, next) => {
  console.log("router /mentorcreate post triggered")
  let {mentor, mentee, startDate, endDate, confirmed} = req.body
  console.log(req.body, "body at BE DC.js")

  Mentorship.create({mentor, mentee, startDate, endDate, confirmed})
    .then(mentorship => {
      console.log('created new mentorship', mentorship)
      res.status(200).json(mentorship)
    })
    .catch(err => {
      next(err)
  })
})

// //delete mentorship
// router.delete('/deutschconnect/mentorship-create/:id', (req, res) => {
//   // delete the project
//   Mentorship.findByIdAndDelete(req.params.id)
//     .then(mentorship => {
//       // Deletes all the documents in the Task collection where the value for the `_id` field is present in the `project.tasks` array
//       console.log('deleted mentorship', mentorship)
//         res.status(200).json({ message: 'ok' });
      
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

module.exports = router;