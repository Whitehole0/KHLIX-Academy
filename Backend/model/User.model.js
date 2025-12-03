import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String },
    refreshToken: { type: String },
    role: {
      type: String,
      enum: ["student", "instructor", "admin"],
      default: "student",
    },
    profileImage: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (password) {
  if (!this.password) return false;
  return await bcrypt.compare(password, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  if (this.password) this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.model("User", userSchema);
