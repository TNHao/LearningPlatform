// import verifyJWTToken from '../../middleware/verifyJWTToken.js';
import { roleCheckMW } from "../middlewares/roleCheck.mw.js";
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
router.get(
  "/:id",
  (req, res, next) => {
    roleCheckMW(req, res, next, ["owner"]);
  },
  GroupController.getOne
);

// @route POST /:id/invitation-url
// @desc Member join group
// @access All
router.get("/:id/invitation-url", GroupController.getInviteUrl);

// @route POST /
// @desc Create Group
// @access Private and role ADMINISTRATOR
router.post("/", GroupController.postCreate);

// @route POST /
// @desc Member join group
// @access All
router.post("/:id/join-group", GroupController.postJoinGroup);

// @route POST /invite
// @desc Invite Member
// @access Private and role ADMINISTRATOR
router.post("/invite", GroupController.postInvite);

// @route PUT /:id
// @desc Update Group
// @access Private and role ADMINISTRATOR
router.put("/:id", GroupController.putUpdate);

// @route DELETE /:id
// @desc Delete Group
// @access Private and role ADMINISTRATOR
router.delete("/:id", GroupController.deleteRemove);

// @route DELETE /:id
// @desc Delete Group
// @access Private and role ADMINISTRATOR
router.delete("/:id/remove-member", GroupController.deleteRemoveMember);

module.exports = router;
