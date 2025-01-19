const { Router } = require("express");
const {
  SignUp,
  SignIn,
  ForgottenPassword,
  resetPassword,
} = require("../appcontrollers/authntication");
const { getTrendingmovies, gettriller } = require("../appcontrollers/movies");
const { datas } = require("../utils/data");
const router = Router();

// authntications
router.route("/signup").post(SignUp);
router.route("/signin").post(SignIn);
router.route("/forgotPassword").post(ForgottenPassword);
router.route("/resetPassword").post(resetPassword);

// movies
router.route("/movies").post(getTrendingmovies);
router.route("/watchtriller").post(gettriller);

router.get('/test',(req,res)=>{
  res.status(200).json({
    message: " router is working very fine"
  })
})

module.exports = router;
