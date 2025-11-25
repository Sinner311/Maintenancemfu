import jwt from "jsonwebtoken";

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, "ACCESS_SECRET", { expiresIn: "15m" });
};

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, "REFRESH_SECRET", { expiresIn: "7d" });
};

export const verifyAccess = (token) => jwt.verify(token, "ACCESS_SECRET");
export const verifyRefresh = (token) => jwt.verify(token, "REFRESH_SECRET");