import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },

    slug: { type: String, unique: true },
    description: { type: String },
    category: { type: String },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
      index: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    price: { type: Number, default: 0 },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    thumbnail: {
      url: String,
      public_id: String,
    },
    studentsCount: { type: Number, default: 0 },
    avgRating: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model("Course", courseSchema);
