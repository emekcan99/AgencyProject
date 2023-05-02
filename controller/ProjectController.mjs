import Project from "../models/Project.mjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const postProject = async (req, res) => {
  const name = await req.files.sampleFile.name;
  const uploadDir = "public/uploads";
  console.log(req)
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadeImage = req.files.sampleFile;
  let uploadPath = __dirname + "/../public/uploads/" + name;

  uploadeImage.mv(uploadPath, async () => {
    await Project.create({
      ...req.body,
      image: "/uploads/" + name,
    });
    res.redirect("/");
  });
};
