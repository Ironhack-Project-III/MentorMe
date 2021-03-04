const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const mentorSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  firstName: String,
  lastName: String
});

const Mentor = model("Mentor", mentorSchema);

module.exports = Mentor;