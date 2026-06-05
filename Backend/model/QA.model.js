import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
);

const questionSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
    },
    title: String,
    text: String,
    answer: [answerSchema],
  },
  { timestamps: true },
);

export default mongoose.model("Question", questionSchema);
