
const express = require("express");
const { redirect } = require("express/lib/response");
const passport = require('passport');
const { isUserAuthenticated } = require("../modules/auth/auth.mdw");

const router = express.Router();
const { createAccount, handleLogin, generateToken } = require("../modules/auth/authController");

const successURL = "http://localhost:3000/id";
const failURL = "http://localhost:3000/login";

router.post("/sign-up", async (req, res, next) => {
  await createAccount(req, res);
})

router.post("/login", async (req, res) => {
  await handleLogin(req, res);

})
router.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/auth/google/callback',
  passport.authenticate('google', { successReturnToOrRedirect: successURL, failureRedirect: failURL, failureMessage: true })
);



router.get('/auth/user', isUserAuthenticated, async (req, res) => {

  res.send("ok");
})

module.exports = router;
