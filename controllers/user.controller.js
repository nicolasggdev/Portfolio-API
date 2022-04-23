const { User } = require("../model/user.model");
const { catchAsync } = require("../utils/catchAsync");
const { storage } = require("../utils/firebase");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");

exports.downloadCv = catchAsync(async (req, res, next) => {
  const data = await User.findAll({ where: { status: "active" } });

  const dataPromises = data.map(
    async ({ id, document, status, createdAt, updatedAt }) => {
      const imgRef = ref(storage, document);

      const documentDownloadUrl = await getDownloadURL(imgRef);

      return {
        id,
        document: documentDownloadUrl,
        status,
        createdAt,
        updatedAt
      };
    }
  );

  const resolvedData = await Promise.all(dataPromises);

  res.status(200).json({
    status: "success",
    data: {
      document: resolvedData
    }
  });
});

exports.createCv = catchAsync(async (req, res, next) => {
  const { language } = req.body;

  const imgRef = ref(storage, `CV/${req.file.originalname}`);

  const result = await uploadBytes(imgRef, req.file.buffer);

  const documentCv = await User.create({
    language,
    document: result.metadata.fullPath
  });

  res.status(201).json({
    status: "success",
    data: {
      documentCv
    }
  });
});
