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

const InviteUrl = mongoose.model("inviteUrl", schema);

export const createUrl = async ({ isPublic, group, sendTo }, callbacks) => {
  const key = uuidv4();

  try {
    let promise;
    if (isPublic) {
      promise = InviteUrl.create({
        key,
        group,
        isPublic,
        isUsed: false,
      });
    } else {
      promise = InviteUrl.create({
        key,
        isPublic,
        group,
        sendTo,
        expirePeriod: URL_EXPIRE_TIME,
        isUsed: false,
      });
    }

    const inviteUrl = await promise;

    callbacks?.success(inviteUrl);
    return inviteUrl;
  } catch (error) {
    callbacks?.error(error);

    throw error;
  }
};

export const isUrlValid = async ({ key, sendTo }, callbacks) => {
  try {
    const inviteUrl = await InviteUrl.findOne({ key }).populate("group");

    if (!inviteUrl) {
      callbacks?.success({ isValid: false });
      return { isValid: false };
    }

    const currentTime = new Date().getTime();
    const createdTime = new Date(inviteUrl.createdAt).getTime();

    if (
      inviteUrl.isUsed ||
      currentTime > createdTime + inviteUrl.expirePeriod ||
      (!inviteUrl.isPublic && sendTo !== inviteUrl.sendTo)
    ) {
      callbacks?.success({ isValid: false, inviteUrl });
      return { isValid: false, inviteUrl };
    }

    callbacks?.success({ isValid: true, inviteUrl });
    return { isValid: true, inviteUrl };
  } catch (error) {
    callbacks?.error(error);
    throw error;
  }
};

export const getUrlDetail = async ({ key, group }, callbacks) => {
  try {
    const inviteUrl = await InviteUrl.findOne({
      $or: [{ key }],
    }).populate("group");
    callbacks?.success(inviteUrl);
    return inviteUrl;
  } catch (error) {
    callbacks?.error?.(error);
    throw error;
  }
};
