const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const { MONGO_URI } = process.env;

// db connection function
async function databaseconnection() {
  const connection = await mongoose.connect(MONGO_URI);
  connection && console.log("database connectted succeesfully");
}

// data hashing function
function hasher(data) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(data, salt);
}

async function confirmEmail() {
    // this function will send the user a verification code
    // if the code went successfull we return true else we return fale
    return false
}
module.exports = { databaseconnection, hasher, confirmEmail };
