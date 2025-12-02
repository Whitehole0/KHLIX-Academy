import asyncHandler from "express-async-handler";
import Course from "../model/Course.model";
import slugify from "slugify";

export const createCourse = asyncHandler(async (req, res) => {
  const { title, description, category, price, thumbnail, level, instructor } =
    req.body;

  const slug = slugify(title, { lower: true });

  const exist = await Course.findOne({ slug });

  if (exist) {
    res.status(404).send("It's already have these course");
  }

  const course = Course.create({
    title,
    description,
    price,
    category,
    thumbnail: req.body.thumbnail || "",
    level,
    instructor,
  });
  res.status(201).send("the course is created sucessfully");
});

export const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find().sort({ createdAt: -1 });

  res.json(courses);
});

export const getCourse = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const course = await Course.findOne({ slug });

  if (!course) {
    res.send("The course is no found");
  }

  res.json(course);
});

export const updateCourse = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const course = await Course.findOne({ slug });

  if (!course) {
    res.send("the course is not found");
  }

  if (req.body.title) {
    req.body.slug = slugify(req.body.title, { lower: true });
  }
  const updated = await Course.findOneAndUpdate({ slug }, req.body, {
    new: true,
  });

  res.json(updated);
});

export const deleteCourse = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const course = await Course.findOne({ slug });

  if (!course) {
    res.send("the course is not found");
  }

  await Course.deleteOne();
  res.json({ Message: "The course is deleted Sucessfully" });
});
