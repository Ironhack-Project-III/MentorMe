// //'node hash.js' to run the script
// const bcrypt = require('bcrypt');
// const password = process.env.KumbiraiPassword;
// const salt = bcrypt.genSaltSync();
// console.log({ salt });
// const hash = bcrypt.hashSync(password, salt);
// console.log({ hash });
// function compare(password, hash) {
//   const salt = hash.slice(0, 29);
//   return hash === bcrypt.hashSync(password, salt)
// }
// console.log(compare('123457', hash))


const mongoose = require("mongoose");
const DeutschConnect = require('./models/DeutschConnect.model');
require("dotenv/config");
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/mentorme";
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true
  })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });






DeutschConnect.create(
  {
    username: "Kumbirai",
    password: process.env.DCpassword,
    role: "DeutschConnect"
  }
)
.then(DC => {
  console.log(`Success! Added ${DC.length} Kumbirai to the database.`);
  mongoose.connection.close();
})
.catch(err => {
  console.log(err);
});