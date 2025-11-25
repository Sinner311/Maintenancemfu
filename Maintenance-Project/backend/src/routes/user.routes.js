import express from 'express';
import { updateUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

var router = express.Router();

router.put("/update", authMiddleware, updateUser);

// Only admin can access
router.get("/admin-only", authMiddleware, roleMiddleware(["admin"]), (req, res) => {
  res.json({ msg: "Admin access success" });
});

export default router;
