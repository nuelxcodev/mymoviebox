const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config({path: process.DOTENV_CONFIG_PATH || '../.env'})
const { MONGO_URI, API_BEARIER } = process.env;

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
  return false;
}

async function responsed(url) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: API_BEARIER,
    },
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error("couldnt fetch data." + error);
  }
}

module.exports = { databaseconnection, hasher, confirmEmail, responsed };
