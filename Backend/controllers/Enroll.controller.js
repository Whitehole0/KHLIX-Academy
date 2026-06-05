import Course from "../model/Course.model.js";
import Enroll from "../model/Enroll.model.js";

export const enrollStudent = async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user.user._id;
  const course = await Course.findById(courseId);

  if (!userId || !course) {
    return res.status(404).json({ Message: "SORRY there is some error " });
  }

  const alreadyEnroll = await Enroll.findOne({ userId, courseId });

  if (alreadyEnroll) {
    return res.status(404).json({ Message: "You have already enroll!!" });
  }

  const enroll = await Enroll.create({
    userId,
    courseId,
    status: "active",
  });

  res.status(201).json({ Message: "You have suceesfully Enrolled", enroll });
};

export const getEnrolledCourses = async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user.user._id;

  const enroll = await Enroll.find({ userId, status: "active" }).sort({
    lessonOrder: 1,
  });

  if (!enroll) {
    return res.status(404).json({ Message: "YOU havent enrolled any course" });
  }

  res.status(200).json({ Message: "here it is", enroll });
};

export const getEnrolledCourse = async (req, res) => {
  const userId = req.user.user._id;
  const { courseId } = req.params;

  const enroll = await Enroll.findOne({ userId, courseId });

  if (!enroll) {
    return res.status(404).json({ Message: "There is no course by these ID" });
  }

  res.status(200).json({ enroll });
};

export const unEnroll = async (req, res) => {
  const userId = req.user.user._id;
  const { courseId } = req.params;
  const unenroll = await Enroll.findOneAndDelete({ userId, courseId });

  if (!unenroll) {
    return res.status(404).json({ Message: "error" });
  }

  res.status(200).json({ Message: "you have sucess fully deleted" });
};
