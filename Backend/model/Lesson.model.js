import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title,
});

export default mongoose.model("Lesson", lessonSchema);
