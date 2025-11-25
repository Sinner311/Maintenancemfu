import { verifyAccess } from "../utils/jwt.js";

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(401).json({ msg: "No token provided" });

  try {
    const decoded = verifyAccess(token);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(403).json({ msg: "Invalid or expired token" });
  }
};
