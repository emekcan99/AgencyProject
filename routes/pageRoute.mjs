import express from "express"
import { getIndexPage, getServicesPage } from "../controller/PageController.mjs";


export const PageRouter = express.Router();

PageRouter.route("/").get(getIndexPage)
PageRouter.route("/services").get(getServicesPage)