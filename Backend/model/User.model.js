import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String },
    role: {
      type: String,
      enum: ["student", "instructor", "admin"],
      default: "student",
    },
    profileImage: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true },
);

userSchema.methods.matchPassword = async function (password) {
  if (!this.password) return false;
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.createResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = 10 * 60 * 1000 + Date.now();

  return resetToken;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  if (this.password) this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.model("User", userSchema);
