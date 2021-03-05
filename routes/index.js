const router = require("express").Router();
//const Mentor = require('../models/Mentor.model');

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)




// router.get('/mentor/profile/:id', (req, res, next) => {
//   Mentor.findById(req.params.id)
//     .then(mentor => {
//       if (!mentor) {
//         res.status(404).json(mentor)
//       } else {
//         res.status(200).json(mentor)
//       }
//     })
//     .catch(err => {
//       next(err)
//     })
// });

module.exports = router;
