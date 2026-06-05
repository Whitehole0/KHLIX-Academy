import asyncHandler from "express-async-handler";
import Course from "../model/Course.model.js";
// import cloudinary from " ../config/cloudinary.js";
// import slugify from "slugify";

export const createCourse = asyncHandler(async (req, res) => {
  const { title, description, category, price, thumbnail, level } = req.body;

  // const slug = slugify(title, { lower: true });

  const exist = await Course.findOne({ title });

  if (exist) {
    res.status(404).send("It's already have these course");
  }

  await cloudinary.uploader.upload({ thumbnail, folder: "/course/${title}" });

  const course = Course.create({
    title,
    slug,
    description,
    price,
    category,
    thumbnail: cloudinary.secure_url || null,
    level,
    instructor: req.user._id,
  });
  res
    .status(201)
    .json({ message: "you have successfully created the course", course });
});

export const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({ status: "published" })
    .sort({ createdAt: -1 })
    .lean();

  res.json(courses);
});

export const getCourse = asyncHandler(async (req, res) => {
  // const { slug } = req.params;

  // const course = await Course.findOne({ slug });

  // if (!course) {
  //   res.send("The course is no found");
  // }

  res.json(req.course);
});

export const updateCourse = asyncHandler(async (req, res) => {
  // const { slug } = req.params;

  // const course = await Course.findOne({ slug });

  const course = req.course;
  if (!course) {
    res.send("the course is not found");
  }

  // if (req.body.title && course.status !== "published") {
  //   req.body.slug = slugify(req.body.title, { lower: true });
  // }
  const updated = await Course.findOneAndUpdate(course, req.body, {
    new: true,
  });

  res.json(updated);
});

export const deleteCourse = asyncHandler(async (req, res) => {
  // const { slug } = req.params;

  // const course = await Course.findOne({ slug });

  const course = req.course;

  if (!course) {
    res.send("the course is not found");
  }
  await Course.deleteOne(course);
  res.json({ Message: "The course is deleted Sucessfully" });
});

export const getCourseSearching = async (req, res) => {
  const { topic } = req.query;

  if (!topic) {
    return res.status(400).json({ message: "Topic query required" });
  }

  const course = await Course.find({
    title: { $regex: topic, $options: "i" },
  }).sort({ createdAt: -1 });

  res.json(course);
};
