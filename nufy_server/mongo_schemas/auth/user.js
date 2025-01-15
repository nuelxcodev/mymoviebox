const mongoose = require("mongoose");
const { Schema } = mongoose;

const User = new Schema({
  email: { type: mongoose.SchemaTypes.String, required: true, unique: true },
  password: { type: mongoose.SchemaTypes.String },
  token: { type: mongoose.SchemaTypes.String },
});

module.exports = mongoose.model("Users", User);
