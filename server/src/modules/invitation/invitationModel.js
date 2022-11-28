import mongoose from "mongoose";
import { URL_EXPIRE_TIME } from "../../constants";
import { Group } from "../group/groupModel";
const { v4: uuidv4 } = require("uuid");
const { Schema } = mongoose;

const schema = new Schema(
  {
    key: { type: Schema.Types.String, require: true },
    group: { type: Schema.Types.ObjectId, require: true, ref: Group },
    isPublic: { type: Schema.Types.Boolean, require: true },
    sendTo: { type: Schema.Types.String, require: false },
    expirePeriod: { type: Schema.Types.Number, require: false },
    isUsed: { type: Schema.Types.Boolean, require: false },
  },
  { timestamps: true }
);

const Invitation = mongoose.model("invitation", schema);

/**
 * @param {Boolean} isPublic
 * @param {ObjectId} group
 * @param {Email} sendTo
 * @param {{success: (data) => void, error: (e) => void}} callbacks
 * @returns invitation info
 */
export const createInvitation = async ({ isPublic, group, sendTo }, callbacks) => {
  const key = uuidv4();

  try {
    let promise;
    if (isPublic) {
      promise = Invitation.create({
        key,
        group,
        isPublic,
        isUsed: false,
      });
    } else {
      promise = Invitation.create({
        key,
        isPublic,
        group,
        sendTo,
        expirePeriod: URL_EXPIRE_TIME,
        isUsed: false,
      });
    }

    const invitation = await promise;

    callbacks?.success(invitation);
    return invitation;
  } catch (error) {
    callbacks?.error(error);

    throw error;
  }
};

export const isInvitationValid = async ({ key, sendTo }, callbacks) => {
  try {
    const invitation = await Invitation.findOne({ key }).populate("group");

    if (!invitation) {
      callbacks?.success({ isValid: false });
      return { isValid: false };
    }

    const currentTime = new Date().getTime();
    const createdTime = new Date(invitation.createdAt).getTime();

    if (
      invitation.isUsed ||
      currentTime > createdTime + invitation.expirePeriod ||
      (!invitation.isPublic && sendTo !== invitation.sendTo)
    ) {
      callbacks?.success({ isValid: false, invitation });
      return { isValid: false, invitation };
    }

    callbacks?.success({ isValid: true, invitation });
    return { isValid: true, invitation };
  } catch (error) {
    callbacks?.error(error);
    throw error;
  }
};

export const getInvitationDetail = async ({ key, group }, callbacks) => {
  try {
    const invitation = await Invitation.findOne({
      $or: [{ key }],
    }).populate("group");
    callbacks?.success(invitation);
    return invitation;
  } catch (error) {
    callbacks?.error?.(error);
    throw error;
  }
};

export const getInvitationPublic = async (group, callbacks) => {
  try {
    const invitation = await Invitation.findOne({ group, isPublic: true }).populate("group");
    callbacks?.success(invitation);
    return invitation;
  } catch (error) {
    callbacks?.error?.(error);
    throw error;
  }
};
