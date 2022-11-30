const express = require("express");
const { activeAccount } = require("../modules/user/userController");


const router = express.Router();

/* GET users listing. */
router.get("/", (req, res, next) => {
  res.send({ a: "user page" });
});
router.get("/:email", (req, res, next) => {
  console.log(req.body);
})
router.get("/verify", async (req, res, next) => {
  await activeAccount();
})
module.exports = router;
