import axios from "axios";
import User from "../models/User.js";
import RefreshToken from "../models/RefreshToken.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

export const loginService = async (usercode, password) => {
  const response = await axios.post(
    "https://lab-stic.mfu.ac.th/api/user/getlogin",
    { usercode, password },
    { headers: { "api-key": "12345678900987666681" } }
  );

  const data = response.data;

  if (data.status === "fail")
    return { success: false, message: "Wrong username/password" };

  let user = await User.findOne({ USERCODE: data.USERCODE });

  if (!user) user = await User.create({ ...data, role: "user" });
  else Object.assign(user, data), await user.save();

  const accessToken = generateAccessToken({ id: user._id, role: user.role });
  const refreshToken = generateRefreshToken({ id: user._id });

  await RefreshToken.create({
    userId: user._id,
    token: refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  });

  return { success: true, accessToken, refreshToken, user };
};
