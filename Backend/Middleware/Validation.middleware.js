export const validateCourseInput = (req, res, next) => {
  const { title, description, price, level, category } = req.body;

  if (!title || title.length < 3) {
    res.status(400).send("Title is too Short or You forget the title");
  }

  if (!description || description.length < 20) {
    return res
      .status(400)
      .send("The description i stoo short ot you forget the description");
  }

  if (!price || price < 0) {
    return res.status(400).send("Error you have invalid Price");
  }

  if (!category) {
    return res.status(400).send("Error You have forget this input");
  }
  if (!level) {
    return res.status(400).send("Error");
  }

  next();
};
