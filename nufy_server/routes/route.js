const { Router } = require("express");
const {
  SignUp,
  SignIn,
  ForgottenPassword,
  resetPassword,
} = require("../appcontrollers/authntication");
const { getTrendingmovies, gettriller } = require("../appcontrollers/movies");
const router = Router();

// authntications
router.route("/signup").post(SignUp);
router.route("/signin").post(SignIn);
router.route("/forgotPassword").post(ForgottenPassword);
router.route("/resetPassword").post(resetPassword);

// movies
router.route("/movies").post(getTrendingmovies);
router.route("/watchtriller").post(gettriller);

module.exports = router;
