import User from "../models/User.js";

export const updateUserService = async (userId, body) => {
  const user = await User.findByIdAndUpdate(userId, body, { new: true });
  return user;
};
