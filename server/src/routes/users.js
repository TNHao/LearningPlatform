const express = require("express");

const router = express.Router();

/* GET users listing. */
router.get("/", (req, res, next) => {
  res.send({ a: "user page" });
});


module.exports = router;
