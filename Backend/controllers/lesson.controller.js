// import Course from "../model/Course.model";
// import Lesson from "../model/Lesson.model";

// export const createLesson = async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     const courseId = req.params.courseId;

//     const course = await Course.findById(courseId);

//     if (!course) {
//       return res.status(400).send("The coures id not exist");
//     }

//     const lesson = await Lesson.create({
//       title,
//       description,
//     });

//     course.lesson.push(lesson._id);
//     await course.save();

//     res.status(201).send(lesson);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getLessonByCourse = async (req, res) => {
//   try {
//     const lesson = await Lesson.find({ course: req.params.courseId }).sort({
//       order: 1,
//     });
//     res.json(lesson);
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const updateLesson = async (req, res) => {
//   try {
//     const lesson = await Lesson.findByIdAndUpdate(
//       req.params.lessonId,
//       req.body,
//       { new: true }
//     );

//     if (!lesson) {
//       return res.status(400).send("The lesson is not found");
//     }

//     res.json(lesson);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const deleteLesson = async (req, res) => {
//   try {
//     const lesson = await Lesson.findById(req.params.lessonId);
//     if (!lesson) {
//       return res.status(400).send("the lesson is not found");
//       await Course.findByIdAndUpdate(lesson.course, {
//         $pull: { lessons: lesson._id },
//       });
//     }

//     await lesson.deleteOne();

//     res.json({ message: "the lesson is sucessfully deleted" });
//   } catch (error) {
//     console.log(error);
//   }
// };

import Course from "../model/Course.model.js";
import Lesson from "../model/Lesson.model.js";

export const createLesson = async (req, res) => {
  const { title, description, videoUrl } = req.body;
  const { courseId } = req.params;

  const course = await Course.findById(courseId);

  if (!course) {
    res.json({ Message: ` these no course with these ${courseId}` });
    return;
  }

  await Lesson.create({
    title,
    description,
    videoUrl,
    courseId,
  });

  res.status(201).json({ Message: "You have succesfully created a lesson" });
};

export const getLessonByCourse = async (req, res) => {
  const { courseId } = req.params;

  if (courseId != Lesson.courseId.toString()) {
    return res.status(403).json({
      message: " invalid lesson ",
    });
  }

  const lessons = await Lesson.find({ courseId, status: "published" }).sort({
    lessonOrder: 1,
  });

  if (!lessons) {
    return res
      .status(404)
      .json({ Message: "There is no course with these id" });
  }

  res.status(200).json(lessons);
};

export const getLessonById = async (req, res) => {
  const lessonId = req.parmas;
  const lesson = await Lesson.findById({ lessonId });

  if (!lesson) {
    return res.status(404).json({ Message: "There is no lesson by these ID" });
  }

  res.status(200).json({ Message: "These is is", lesson });
};

export const updateLesson = async (req, res) => {
  const { lessonId } = req.params;

  const lessons = await Lesson.findByIdAndUpdate(lessonId, req.body);

  if (!lessons) {
    return res.status(404).json({ Messsage: "There is no lesson" });
  }

  res.json(lessons);
};

export const deleteOne = async (req, res) => {
  const { lessonId } = req.params;

  const lessons = await Lesson.findByIdAndDelete(lessonId);

  if (!lessons) {
    return res.status(404).json({ Message: "There is no lesson" });
  }

  res.json({ Message: "The lesson is sucessfully deleted" });
};

export const saveVideo = async (req, res) => {
  const { lessonId, courseId } = req.params;
  const { type, public_id, url } = req.body;

  const lesson = await Lesson.findById(lessonId);
  if (!lesson) {
    return res.status(404).json({
      Message: " not found",
    });
  }

  const course = await Course.findById(lessonId);
  if (!course) {
    return res.status(404).json({
      Message: " not found",
    });
  }

  if (type === "thumbnail") {
    course.thumbnail = { public_id, url };
  }
  if (type === "video") {
    lesson.videoUrl = { public_id, url };
  }

  await lesson.save();
};
