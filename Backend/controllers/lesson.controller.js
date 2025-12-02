import Course from "../model/Course.model";
import Lesson from "../model/Lesson.model";

export const createLesson = async (req, res) => {
  try {
    const { title, description } = req.body;
    const courseId = req.params.courseId;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(400).send("The coures id not exist");
    }

    const lesson = await Lesson.create({
      title,
      description,
    });

    course.lesson.push(lesson._id);
    await course.save();

    res.status(201).send(lesson);
  } catch (error) {
    console.log(error);
  }
};

export const getLessonByCourse = async (req, res) => {
  try {
    const lesson = await Lesson.find({ course: req.params.courseId }).sort({
      order: 1,
    });
    res.json(lesson);
  } catch (err) {
    console.log(err);
  }
};

export const updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(
      req.params.lessonId,
      req.body,
      { new: true }
    );

    if (!lesson) {
      return res.status(400).send("The lesson is not found");
    }

    res.json(lesson);
  } catch (error) {
    console.log(error);
  }
};

export const deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.lessonId);
    if (!lesson) {
      return res.status(400).send("the lesson is not found");
      await Course.findByIdAndUpdate(lesson.course, {
        $pull: { lessons: lesson._id },
      });
    }

    await lesson.deleteOne();

    res.json({ message: "the lesson is sucessfully deleted" });
  } catch (error) {
    console.log(error);
  }
};
