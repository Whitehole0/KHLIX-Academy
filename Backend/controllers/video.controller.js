import cloudinary from "../config/cloudinary";
import Course from "../model/Course.model.js";
import Enroll from "../model/Enroll.model.js";
import Lesson from "../model/Lesson.model.js";

export const getSignedVideo = async (req, res) => {
  try {
    const { courseId, lessonId } = req.parmas;
    const course = await Course.findById(courseId);

    if (!course) {
      return;
    }

    const enrolled = Enroll.findone(req.user._id);
    if (!enrolled) {
      return;
    }

    const lesson = Lesson.findById(lessonId);
    if (!lesson || !lesson.video.public_id) {
      return res.status(404).json({ message: " not found" });
    }

    const signedUrl = cloudinary.url(lesson.video.public_id, {
      resourse_type: "video",
      sign_url: true,
      expires_at: Math.floor(Date.now() / 1000) + 300,
    });

    res.json({
      videoUrl: signedUrl,
    });
  } catch (error) {
    res.status(500).json({ message: " server error", error });
  }
};
