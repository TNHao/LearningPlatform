const express = require("express");
const { isUserAuthenticated } = require("../modules/auth/auth.mdw");
const { activeAccount, getUserInfo } = require("../modules/user/userController");
const { findUserById } = require("../modules/user/userModel");
const emailTemplate = require("../utils/emailTemplate");


const router = express.Router();

/* GET users listing. */
router.get("/", isUserAuthenticated, async (req, res) => {
  getUserInfo(req, res);
});
router.get("/", (req, res, next) => {
  console.log(req.body);
})
router.get("/verify", async (req, res, next) => {
  await activeAccount();
})
module.exports = router;
