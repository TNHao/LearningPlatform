
const express = require("express");
const passport = require('passport');

const router = express.Router();
const { createAccount, handleLogin } = require("../authentication/authController");

router.post("/sign-up", async (req, res, next) => {

  await createAccount(req, res);
})

router.post("/login", async (req, res) => {
  await handleLogin(req, res);

})

module.exports = router;
