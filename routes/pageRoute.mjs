import express from "express";
import {
  getIndexPage,
  getServicesPage,
} from "../controller/PageController.mjs";
import {
  getAllProjects,
  getProject,
} from "../controller/ProjectController.mjs";

export const PageRouter = express.Router();

PageRouter.route("/").get(getAllProjects);
PageRouter.route("/:id").get(getProject);
