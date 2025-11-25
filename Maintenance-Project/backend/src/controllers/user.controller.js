import { updateUserService } from "../services/user.service.js";

export const updateUser = async (req, res) => {
  const updates = {
    mobile_phone: req.body.mobile_phone,
    department: req.body.department
  };

  const user = await updateUserService(req.user.id, updates);

  res.json({ msg: "Updated successfully", user });
};
