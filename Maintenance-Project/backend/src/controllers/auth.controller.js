import { loginService } from "../services/auth.service.js";
import { verifyRefresh } from "../utils/jwt.js";
import RefreshToken from "../models/RefreshToken.js";
import User from "../models/User.js";
import { generateAccessToken } from "../utils/jwt.js";

export const login = async (req, res) => {
  const { usercode, password } = req.body;

  const result = await loginService(usercode, password);

  if (!result.success)
    return res.status(401).json({ msg: result.message });

  res.json(result);
};

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.status(400).json({ msg: "Missing token" });

  const stored = await RefreshToken.findOne({ token: refreshToken });
  if (!stored) return res.status(403).json({ msg: "Invalid refresh token" });

  try {
    const decoded = verifyRefresh(refreshToken);

    const user = await User.findById(decoded.id);
    const newAccessToken = generateAccessToken({ id: user._id, role: user.role });

    res.json({ accessToken: newAccessToken });

  } catch (err) {
    return res.status(403).json({ msg: "Expired refresh token" });
  }
};
