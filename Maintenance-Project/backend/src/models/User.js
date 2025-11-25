import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  USERCODE: { type: String, required: true, unique: true },
  NAME: String,
  SURNAME: String,
  EMAIL: String,
  DEPARTMENTCODE: String,
  DEPARTMENTNAME: String,
  FACULTYNAME: String,
  PREFIXNAME: String,
  USERGROUP: Number,
  USERSTATUS: String,
  USERWORK: Number,
  POSITIONNAME: String,
  
  // เพิ่มของเราเอง
  mobile_phone: { type: String, default: "" },
  department: { type: String, default: "" },

  role: { type: String, default: "user" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", UserSchema);
