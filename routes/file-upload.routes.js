const express = require('express');
const router = express.Router();
 
// include CLOUDINARY:
const { uploader } = require('../config/cloudinary');
 
router.post('/upload', uploader.single('imgPath'), (req, res, next) => {
  // console.log('file is: ', req.file)
  // const imgPath = req.file.path;
  // const imgName = req.file.originalname;
  // const publicId = req.file.filename
 
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  // get secure_url from the file object and save it in the
  // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
 
  res.json({ secure_url: req.file.path });
});
 
module.exports = router;