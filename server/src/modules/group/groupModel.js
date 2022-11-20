import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema(
  {
    name: { type: Schema.Types.String, require: true },
    members: [
      {
        detail: { type: Schema.Types.ObjectId, ref: "user", require: true },
        role: { type: Schema.Types.Number, require: true },
        _id: false,
      },
    ],
  },
  { timestamps: true }
);

const Group = mongoose.model("Group", schema);

/**
 *
 * @param {*} groupInfo
 * @param {{success: (data) => void, error: (e) => void}} callbacks
 * @returns new group info
 */
export const createGroup = async (groupInfo, callbacks) => {
  try {
    const group = await Group.create(groupInfo);
    callbacks?.success(group);
    return group;
  } catch (error) {
    callbacks?.error(error);
    return error;
  }
};

/**
 *
 * @param {*} groupInfo
 * @param {{success: (data) => void, error: (e) => void}} callbacks
 * @returns updated group info
 */
export const updateGroupInfo = async (groupInfo, callbacks) => {
  try {
    const group = await Group.findOneAndUpdate(
      { _id: groupInfo._id },
      groupInfo,
      { new: true }
    );
    callbacks?.success(group);
    return group;
  } catch (error) {
    callbacks?.error(error);
    return error;
  }
};

/**
 *
 * @param {ObjectId} groupId
 * @param {{detail: memberId, role: new role}} memberInfo
 * @param {{success: (data) => void, error: (e) => void}} callbacks
 * @returns updated group info
 */
export const addMember = async (groupId, memberInfo, callbacks) => {
  try {
    const group = await Group.findOneAndUpdate(
      { _id: groupId },
      { $push: { members: memberInfo } },
      { new: true }
    );
    callbacks?.success(group);
    return group;
  } catch (error) {
    callbacks?.error(error);
    return error;
  }
};

/**
 *
 * @param {ObjectId} groupId
 * @param {ObjectId} memberId
 * @param {{success: (data) => void, error: (e) => void}} callbacks
 * @returns updated group info
 */
export const removeMember = async (groupId, memberId, callbacks) => {
  try {
    const group = await Group.findOneAndUpdate(
      { _id: groupId },
      { $pull: { members: { detail: memberId } } },
      { new: true }
    );
    callbacks?.success(group);
    return group;
  } catch (error) {
    callbacks?.error(error);
    return error;
  }
};

/**
 *
 * @param {ObjectId} groupId
 * @param {{detail: memberId, role: new role}} memberInfo
 * @param {{success: (data) => void, error: (e) => void}} callbacks
 * @returns updated group info
 */
export const updateMemberRole = async (groupId, memberInfo, callbacks) => {
  try {
    const updatedGroup = await Group.findOneAndUpdate(
      { _id: groupId, members: { $elemMatch: { detail: memberInfo.detail } } },
      {
        $set: { "members.$.role": memberInfo.role },
      },
      { new: true }
    );

    callbacks?.success(updatedGroup);
    return updatedGroup;
  } catch (error) {
    callbacks?.error(error);
    return error;
  }
};

/**
 *
 * @param {ObjectId} memberId
 * @param {{success: (data) => void, error: (e) => void}} callbacks
 * @returns { Object } group info
 */
export const findGroupByMemberId = async (memberId, callbacks) => {
  try {
    const groups = await Group.find({
      members: { $elemMatch: { detail: memberId } },
    });
    callbacks?.success(groups);
    return groups;
  } catch (error) {
    callbacks?.error(error);
    return error;
  }
};
