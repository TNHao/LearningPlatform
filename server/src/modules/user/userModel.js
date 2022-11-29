import mongoose from "mongoose";

const { Schema } = mongoose;

const schema = new Schema(
  {
    name: { type: Schema.Types.String, require: true },
    username: { type: Schema.Types.String, require: true },
    email: { type: Schema.Types.String, require: true, unique: true },
    password: { type: Schema.Types.String },
    avatarUrl: { type: Schema.Types.String },
    isActive: { type: Schema.Types.Boolean, default: 0 },
    token: { type: Schema.Types.String },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", schema);

/**
 *
 * @param {*} userInfo
 * @param {{success: (data) => void, error: (e) => void}} callbacks
 * @returns new user info
 */
export const createUser = async (userInfo, callbacks) => {
  try {
    const user = await User.create(userInfo);
    callbacks?.success(user);
    return user;
  } catch (error) {
    callbacks?.error(error);
    throw error;
  }
};

/**
 *
 * @param {*} userInfo
 * @param {{success: (data) => void, error: (e) => void}} callbacks
 * @returns updated user info
 */
export const updateUserInfo = async (userInfo, callbacks) => {
  try {
    const user = await User.findOneAndUpdate({ _id: userInfo._id }, userInfo, {
      new: true,
    });
    callbacks?.success(user);
    return user;
  } catch (error) {
    callbacks?.error(error);
    throw error;
  }
};

/**
 *
 * @param {ObjectId} userId
 * @param {{success: (data) => void, error: (e) => void}} callbacks
 * @returns updated user info
 */
export const findUserById = async (userId, callbacks) => {
  try {
    const user = await User.findOne({ _id: userId });
    callbacks?.success(user);
    return user;
  } catch (error) {
    callbacks?.error(error);
    throw error;
  }
};

/**
 *
 * @param {email} email
 * @param {{success: (data) => void, error: (e) => void}} callbacks
 * @returns updated user info
 */
export const findUserByEmail = async (email, callbacks) => {
  try {
    const user = await User.findOne({ email });
    callbacks?.success(user);
    return user;
  } catch (error) {
    callbacks?.error(error);
    throw error;
  }
};
