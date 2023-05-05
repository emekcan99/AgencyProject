import Project from "../models/Project.mjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//create and post a new project
export const postProject = async (req, res) => {
  const name = await req.files.sampleFile.name;
  const uploadDir = "public/uploads";
  console.log(req);
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

//get all projects

export const getAllProjects = async (req, res) => {
  const projects = await Project.find({}).sort("-dateCreated");

  res.render("index", {
    projects: projects,
  });
};

// get a project

export const getProject = async (req, res) => {
  const project = await Project.findById({ id: req.params._id });
  console.log(req);

  res.render("project", {
    project: project,
  });
};

// delete a project

export const deleteProject = async (req, res) => {
  // console.log(req.params.id)

  const project = await Project.findOne({ _id: req.params.id });

  let deletedImage = __dirname +"/../public" + project.image;

  fs.unlinkSync(deletedImage);

  await Project.findByIdAndRemove(req.params.id);

  res.redirect("/");
};


export const updateProject = async (req,res) => {

  const project = await Project.findOne({_id:req.params.id})
  
  
  project.title =  req.body.title
  project.subtitle =  req.body.subtitle
  project.category =  req.body.category
  project.client =  req.body.client
  project.description =  req.body.description

  project.save()
  
 
  res.redirect("/")

}