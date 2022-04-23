const express = require("express");

const {
  createProject,
  getAllProjects
} = require("../controllers/project.controller");

const { uploadImage } = require("../utils/multer");

const router = express.Router();

router
  .route("/")
  .get(getAllProjects)
  .post(uploadImage.single("imgProject"), createProject);

module.exports = { projectsRouter: router };
