const express = require("express");

const {
  createTecnologies,
  getAllTecnologies
} = require("../controllers/tecnologies.controller");

const { uploadImage } = require("../utils/multer");

const router = express.Router();

router
  .route("/")
  .get(getAllTecnologies)
  .post(uploadImage.single("imgTecnologies"), createTecnologies);

module.exports = { tecnologiesRouter: router };
