// Import Library
// import * as argon2 from 'argon2';
// import jwt from 'jsonwebtoken';

// Import Model
import {
  findGroupByMemberId,
  findGroupById,
  createGroup,
  updateGroupInfo,
  addMember,
  updateMemberRole,
  removeMember,
  deleteGroup,
} from "./groupModel.js";
import { findUserById, findUserByEmail } from "../user/userModel.js";

// Import Service
import { sendInvitationMail } from "../../services/email/index.js";
import {
  createInvitation,
  isInvitationValid,
  getInvitationDetail,
  getInvitationPublic,
} from "../invitation/invitationModel.js";

/**
 * Get All Group
 * @param req
 * @param res
 * @returns void
 */
export const getAllByUserId = async (req, res) => {
  try {
    // if (!(await checkRoles(req.groupId, ['administrator', 'manager']))) {
    //   return res.status(403).json({ success: false, message: "Permission denied" });
    // }

    findGroupByMemberId(req.body.userId, {
      success: (groups) => {
        return res.json({ success: true, data: groups });
      },
      error: (error) => {
        console.log(error);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Get One Group
 * @param req
 * @param res
 * @returns void
 */
export const getOne = async (req, res) => {
  const { id } = req.params;

  try {
    // if (!(await checkRoles(req.groupId, ['administrator', 'manager']))) {
    //   return res.status(403).json({ success: false, message: "Permission denied" });
    // }

    findGroupById(id, req.body.userId, {
      success: (group) => {
        if (!group) {
          return res
            .status(404)
            .json({ success: false, message: "Group not exist" });
        }
        res.status(200).json({ success: true, data: group });
      },
      error: (error) => {
        console.log(error);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * POST Create Group
 * @param req
 * @param res
 * @returns void
 */
export const postCreate = async (req, res) => {
  const { name, userId } = req.body;

  try {
    createGroup(
      {
        name: name,
        members: [
          {
            detail: userId,
            role: "owner",
          },
        ],
      },
      {
        success: (group) => {
          createInvitation(
            { isPublic: true, group: group._id },
            {
              success: (invitation) => {
                const genLink = req.protocol + "://" + req.get("host") + `/groups/invite/group=${group._id}&code=${invitation.key}`;
                res.status(200).json({ success: true, data: { group, inviteUrl: genLink } });
              },
              error: (error) => {
                console.log(error);
                res.status(500).json({ success: false, message: "Internal server error" });
              },
            }
          );
        },
        error: (error) => {
          console.log(error);
          res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        },
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * POST Invite Member
 * @param req
 * @param res
 * @returns void
 */
export const postInvite = async (req, res) => {
  const { groupId, userId, emails } = req.body;
  try {
    var success = true;
    findUserById(userId, {
      success: (owner) => {
        emails.forEach((email) => {
          createInvitation(
            {
              isPublic: false,
              group: groupId,
              sendTo: email,
            },
            {
              success: (invitation) => {
                const genLink = req.protocol + "://" + req.get("host") + `/groups/invite/group=${groupId}&code=${invitation.key}`;
                console.log(owner.email, email);
                sendInvitationMail(owner.name, "Group", email, genLink);
              },
              error: (error) => {
                console.log(error);
                success = false;
                return res
                  .status(500)
                  .json({ success: false, message: "Internal server error" });
              },
            }
          );
        });
      },
      error: (error) => {
        console.log(error);
        success = false;
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      },
    });
    if (success) {
      res.status(200).json({ success: true, message: "Invited successful" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * PUT Update Group
 * @param req
 * @param res
 * @returns void
 */
export const putUpdate = async (req, res) => {
  const { id } = req.params;
  const { groupInfo } = req.body;
  try {
    updateGroupInfo(groupInfo, {
      success: (group) => {
        res.status(200).json({ success: true, data: group });
      },
      error: (error) => {
        console.log(error);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * DELETE Detele Group
 * @param req
 * @param res
 * @returns void
 */
export const deleteRemove = async (req, res) => {
  const { id } = req.params;
  try {
    deleteGroup(id, {
      success: () => {
        res.status(200).json({ success: true, message: "Deleted Successful" });
      },
      error: (error) => {
        console.log(error);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const postJoinGroup = async (req, res) => {
  const { id: groupId } = req.params;
  const { userEmail, inviteKey: key } = req.body;
  const { userId } = req.body;

  try {
    const { isValid } = await isInvitationValid({ key, userEmail });

    if (!isValid) {
      return res
        .status(200)
        .json({ success: false, message: "Invite link is invalid" });
    }

    addMember(
      groupId,
      { detail: userId, role: "member" },
      {
        success: (group) => {
          res.status(200).json({ success: true, data: group });
        },
        error: (error) => {
          console.log(error);
          res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        },
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getInviteUrl = async (req, res) => {
  const { id: groupId } = req.params;

  getInvitationPublic(groupId, {
    success: (invitation) => {
      const genLink = req.protocol + "://" + req.get("host") + `/groups/invite/group=${groupId}&code=${invitation.key}`;
      res.status(200).json({ success: true, data: { inviteUrl: genLink } });
    },
    error: (error) => {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    },
  });
};

export const deleteRemoveMember = async (req, res) => {
  const { id: groupId } = req.params;
  const { userId } = req.body;

  removeMember(groupId, userId, {
    success: (group) => {
      res.status(200).json({ success: true, data: group });
    },
    error: (error) => {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    },
  });
};
