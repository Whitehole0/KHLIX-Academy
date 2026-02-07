export const validateCourseInput = (req, res, next) => {
  const { title, description, price, level, category } = req.body;

  if (!title || title.trim().length < 3) {
    return res.status(400).json({
      message: "Course title must be at least 3 characters long",
    });
  }

  if (!description || description.trim().length < 20) {
    return res.status(400).json({
      message: "Course description must be at least 20 characters long",
    });
  }

  if (price === undefined || price < 0) {
    return res.status(400).json({
      message: "Invalid course price",
    });
  }

  if (!category) {
    return res.status(400).json({
      message: "Course category is required",
    });
  }

  const validLevels = ["beginner", "intermediate", "advanced"];
  if (!level || !validLevels.includes(level)) {
    return res.status(400).json({
      message: "Invalid course level",
    });
  }

  next();
};

import Course from "../model/Course.model.js";

export const courseStatus = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.status !== "published") {
      return res.status(403).json({
        message: "This course is not published yet",
      });
    }

    req.course = course; // attach for next middleware/controller
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

import Enroll from "../model/Enroll.model.js";

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

import Lesson from "../model/Lesson.model.js";

export const lessonPublishedOnly = async (req, res, next) => {
  const { lessonId } = req.params;

  const lesson = await Lesson.findById(lessonId);
  if (!lesson) {
    return res.status(404).json({ message: "Lesson not found" });
  }

  if (lesson.status !== "published") {
    return res.status(403).json({
      message: "This lesson is not published",
    });
  }

  req.lesson = lesson;
  next();
};

import Course from "../model/Course.model.js";

export const isCourseOwner = async (req, res, next) => {
  const { courseId } = req.params;

  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  if (
    req.user.role !== "admin" &&
    course.instructor.toString() !== req.user._id.toString()
  ) {
    return res.status(403).json({
      message: "You do not own this course",
    });
  }

  req.course = course;
  next();
};
