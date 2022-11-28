const express = require("express");
const { verifyAccount } = require("../modules/user/userController");


const router = express.Router();

/* GET users listing. */
router.get("/", (req, res, next) => {
  res.send({ a: "user page" });
});

router.get("/verify", async (req, res, next) => {
  await verifyAccount();
})
module.exports = router;
