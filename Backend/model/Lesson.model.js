import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" }, // just that i dont made a module model
  description: { type: String, required: true },
  lessonType: {
    type: String,
    enum: { Video, Article, Quiz, Assignment },
    default: Video,
  },
  videoUrl: String,
  doucment: String,
  lessonOrder: { type: Number, required: true },
  lessonDuration: { type: Number },
  status: {
    type: String,
    enum: ["draft", "published", "archived"],
    default: "draft",
    index: true,
  },
});

export default mongoose.model("Lesson", lessonSchema);
