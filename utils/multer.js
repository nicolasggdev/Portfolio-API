const multer = require("multer");

const { AppError } = require("./appError");

const storage = multer.memoryStorage();

const multerFileFilterDocument = (req, file, cb) => {
  if (!file.mimetype.startsWith("application")) {
    cb(new AppError(400, "Must provide a pdf as a file"), false);
  } else {
    cb(null, true);
  }
};

const uploadDocument = multer({
  storage,
  fileFilter: multerFileFilterDocument
});

const multerFileFilterImage = (req, file, cb) => {
  if (!file.mimetype.startsWith("image")) {
    cb(new AppError(400, "Must provide a pdf as a file"), false);
  } else {
    cb(null, true);
  }
};

const uploadImage = multer({
  storage,
  fileFilter: multerFileFilterImage
});

module.exports = { uploadDocument, uploadImage };
