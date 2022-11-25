// import verifyJWTToken from '../../middleware/verifyJWTToken.js';
import * as GroupController from "../modules/group/groupController.js";
var express = require("express");
const router = express.Router();

// @route GET /
// @desc Get All Group
// @access Private and role ADMINISTRATOR or MANAGER
router.get("/", GroupController.getAllByUserId);

// @route GET /:id
// @desc Show Group
// @access Private and role ADMINISTRATOR or MANAGER
router.get("/:id", GroupController.getOne);

// @route POST /
// @desc Create Group
// @access Private and role ADMINISTRATOR
router.post("/", GroupController.postCreate);

// @route POST /invite
// @desc Invite Member
// @access Private and role ADMINISTRATOR
router.post("/invite", GroupController.postInvite)

// verify invitation
// remove menber
// set co-owner

// @route PUT /
// @desc Update Group
// @access Private and role ADMINISTRATOR
router.put("/", GroupController.putUpdate);

// @route DELETE /:id
// @desc Delete Group
// @access Private and role ADMINISTRATOR
router.delete("/:id", GroupController.deleteRemove);

module.exports = router;
