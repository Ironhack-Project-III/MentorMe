const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const deutschConnectSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  role: { type: String, default: 'DeutschConnect' },
},
{timestamps: true}
);

const DeutschConnect = model("DeutschConnect", deutschConnectSchema);

module.exports = DeutschConnect;