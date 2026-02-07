import Course from "../model/Course.model";
import Enroll from "../model/Enroll.model";

export const enroleMiddleware = async (req, res, next) => {
  const userId = req.user._id;
  const courseId = req.params;
  const course = await Course.findById(courseId);

  if (!course) {
    res.status(401).json({ message: "the course is not found" });
  }

  const enrollment = await Enroll.findOne({ userId, courseId });

  if (enrollment) {
    res.status(200).json({ message: "You are already enrolled" });
  }
  req.enrollment = enrollment;
  next();
};

export const requireEnrollment = (req, res, next) => {
  const userId = req.user._id;
  const courseId = req.params;

  const enrolled = Enroll.findOne({ userId, courseId });

  if (!enrolled) {
    res
      .status(403)
      .json({ message: "You have to enroll to these course first" });
  }

  next();
};
