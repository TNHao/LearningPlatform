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
} from "./groupModel.js";

// Import Util
// import generatorCode from '../../util/generatorCode.js';
// import htmlEntities from '../../util/htmlEntity.js';
// import emailSender from '../../util/emailSender.js';
// import { checkRole, checkRoles } from '../../util/accessChecker.js';

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
      error: (e) => {
        console.log(e);
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
      error: (e) => {
        console.log(e);
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
    createGroup({
      name: name,
      members: [
        {
          detail: userId,
          role: 1,
        },
      ],
    }, {
      success: (group) => {
        res.status(200).json({ success: true, data: group });
      },
      error: (e) => {
        console.log(e);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
    });
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
  const { status } = req.body;
  try {
    // if (!(await checkRole(req.groupId, "administrator"))) {
    //   return res
    //     .status(403)
    //     .json({ success: false, message: "Permission denied" });
    // }

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
  try {

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
