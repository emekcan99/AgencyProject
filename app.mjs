import express from "express";
import mongoose from "mongoose";
import { postProject } from "./controller/ProjectController.mjs";
import fileUpload from "express-fileupload";
import { PageRouter } from "./routes/pageRoute.mjs";

const app = express();

const port = 3000;

// view engine

app.set("view engine", "ejs");

//db connection
mongoose
  .connect("mongodb://localhost:27017/Agency-test-db")
  .then(() => console.log("connected!"));

// middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  fileUpload({
    createParentPath: true,
  })
);



//routes
app.use("/",PageRouter)

app.post("/", postProject);

app.listen(port, () => {
  console.log(`App is up on port ${port}`);
});
