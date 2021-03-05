const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const menteeSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  role: { type: String, default: 'Mentee' },
  firstName: String,
  lastName: String
});

const Mentee = model("Mentee", menteeSchema);

module.exports = Mentee;