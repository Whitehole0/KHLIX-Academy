import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    slug: { type: String, unique: true },
    description: String,
    category: String,
    price: { type: Number, default: 0 },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    thumbnail: String,
    studentsCount: { type: Number, default: 0 },
    avgRating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
