import express, { json } from "express";
import Auth from "./Routes/Auth.routes.js";
import connectDB from "./config/db.config.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("These is the Home page");
});

app.use("/api", Auth);

connectDB();
app.listen(3000, () => {
  console.log("The app is listening");
});
