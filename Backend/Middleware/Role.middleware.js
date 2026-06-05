import Enroll from "../model/Enroll.model";

export const isEnrolled = async (req, res, next) => {
  const userId = req.user._id;
  const { courseId } = req.params;

  const enrolled = await Enroll.findOne({
    userId,
    courseId,
    status: "active",
  });

  if (!enrolled) {
    return res.status(403).json({
      message: "You are not enrolled in this course",
    });
  }

  next();
};
