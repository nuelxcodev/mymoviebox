const Users = require("../mongo_schemas/auth/user.js");
const jwt = require("jsonwebtoken");
const { hasher, confirmEmail } = require("../utils/helpers.js");

async function SignUp(req, res) {
  // return
  const { credentials } = req.body;
  const password = credentials.password.trim();
  const email = credentials.email.trim();

  try {
    if (!(password && email)) {
      res.status(400).send({ success: false, message: "invalid credentials" });
      return;
    }

    const isExisting = await Users.findOne({ email });
    // if user exist? send this
    if (isExisting) {
      res.status(401).json({
        success: false,
        message: " user already exit",
      });
      return;
    }
    const verifyEmail = await confirmEmail(email);
    if (verifyEmail) {
      const hashed_password = hasher(password);
      await Users.create({ email, password: hashed_password });
      res.status(200).json({
        success: true,
        message: "check email for verifaction code",
      });
      return;
    }
    res.status(401).json({
      success: false,
      message: "failed to send verication code please try again",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: " an error ocurred during this process please try again",
    });
  }
}
async function SignIn(req, res) {
}
async function ForgottenPassword(req, res) {}
async function resetPassword(req, res) {}

module.exports = { SignIn, SignUp, ForgottenPassword, resetPassword };
