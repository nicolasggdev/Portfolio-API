const express = require("express");

const { uploadDocument } = require("../utils/multer");

const { downloadCv, createCv } = require("../controllers/user.controller");

const router = express.Router();

router
  .route("/")
  .get(downloadCv)
  .post(uploadDocument.single("document"), createCv);

module.exports = { userRouter: router };
