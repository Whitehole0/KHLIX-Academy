import Progress from "../model/Progress.model.js";
import Lesson from "../model/Lesson.model.js";
import Certificate from "../model/Certificate.model.js";
import { generateCertificate } from "../utils/generateCertficate.js";
import User from "../model/User.model.js";
import Course from "../model/Course.model.js";

export const markLessonComplete = async (req, res) => {
  try {
    const { lessonId, courseId } = req.body;
    const userId = req.user._id;

    let progress = await Progress.findOne({
      user: userId,
      course: courseId,
      completed: [],
    });

    if (!progress.lesson.includes(lessonId)) {
      progress.lesson.push(lessonId);
    }

    const totalLesson = await Lesson.countDocuments({ course: courseId });

    const percentage = (progress.lesson.length / totalLesson) * 100;

    progress.progressPercentage = Math.round(percentage);

    progress.completed = percentage === 100;

    await progress.save();

    if (progress.completed) {
      const exists = await Certificate.findOne({
        user: userId,
        course: courseId,
      });

      if (!exists) {
        const user = await User.findOne({ userId });
        const course = await Course.findONe(courseId);

        const { certificateId } = await generateCertificate(
          user.name,
          course.title,
        );

        await Certificate.create({
          user: userId,
          course: courseId,
          certificateId,
        });
      }
    }

    res.json(progress);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};

export const courseProgress = async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user._id;

  const progress = await Progress.findOne({
    user: userId,
    course: courseId,
  });

  res.json(progress || { progressPercentage: 0 });
};
