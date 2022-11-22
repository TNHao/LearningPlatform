// import verifyJWTToken from '../../middleware/verifyJWTToken.js';
import * as GroupController from "../modules/group/groupController.js";
var express = require("express");
const router = express.Router();

// @route GET /groups
// @desc Get All Group
// @access Private and role ADMINISTRATOR or MANAGER
router.get("/", GroupController.getAllByUserId);

// @route GET /groups/:id
// @desc Show Group
// @access Private and role ADMINISTRATOR or MANAGER
router.get("/:id", GroupController.getOne);

// @route POST /groups
// @desc Create Group
// @access Private and role ADMINISTRATOR
router.post("/", GroupController.postCreate);

// send invite email
// verify invitation
// remove menbers[]
// set co-owner

// @route PUT /groups
// @desc Update Group
// @access Private and role ADMINISTRATOR
router.put("/", GroupController.putUpdate);

// @route DELETE /groups/:id
// @desc Delete Group
// @access Private and role ADMINISTRATOR
router.delete("/:id", GroupController.deleteRemove);

module.exports = router;
