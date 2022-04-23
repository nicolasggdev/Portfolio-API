const { Tecnologies } = require("../model/tecnologies.model");
const { storage } = require("../utils/firebase");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { catchAsync } = require("../utils/catchAsync");

exports.createTecnologies = catchAsync(async (req, res, next) => {
  const { name, projectId } = req.body;

  const imgRef = ref(storage, `tecnologies/${req.file.originalname}`);

  const result = await uploadBytes(imgRef, req.file.buffer);

  const newTecnology = await Tecnologies.create({
    name,
    projectId,
    image: result.metadata.fullPath
  });

  res.status(201).json({
    status: "success",
    data: {
      newTecnology
    }
  });
});

exports.getAllTecnologies = catchAsync(async (req, res, next) => {
  const tecnologies = await Tecnologies.findAll({
    where: { status: "active" }
  });

  const tecnologiesPromises = tecnologies.map(
    async ({ id, name, projectId, image, status, createdAt, updatedAt }) => {
      const imgRef = ref(storage, image);

      const imgDownloadUrl = await getDownloadURL(imgRef);

      return {
        id,
        name,
        projectId,
        image: imgDownloadUrl,
        status,
        createdAt,
        updatedAt
      };
    }
  );

  const resolvedTecnologies = await Promise.all(tecnologiesPromises);

  res.status(200).json({
    status: "success",
    data: {
      tecnologies: resolvedTecnologies
    }
  });
});
