import Question from "../model/QA.model.js";

export const cerateQuestion = async (req, res) => {
  const { course, lesson, title, text } = req.body;

  const question = await Question.create({
    course,
    lesson,
    title,
    text,
    user: req.user._id,
  });

  res.status(201).json({
    data: question,
  });
};
