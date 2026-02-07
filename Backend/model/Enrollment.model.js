import mongoose from "mongoose";

const enrollSchema = mongoose.schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    enrolledAt: { type: Date },
    status: { enum: [active, cancelled], default: "active" },
  },
  { timestamps: true },
);

export default mongoose.model("Enroll", enrollSchema);
