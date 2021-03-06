const { Project } = require("../model/project.model");
const { Tecnologies } = require("../model/tecnologies.model");
const { storage } = require("../utils/firebase");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { catchAsync } = require("../utils/catchAsync");

exports.createProject = catchAsync(async (req, res, next) => {
  const { deploy, title, englishDescription, spanisDescription } = req.body;

  const imgRef = ref(storage, `projects/${req.file.originalname}`);

  const result = await uploadBytes(imgRef, req.file.buffer);

  const newProject = await Project.create({
    deploy,
    title,
    englishDescription,
    spanisDescription,
    image: result.metadata.fullPath
  });

  res.status(201).json({
    status: "success",
    data: {
      newProject
    }
  });
});

exports.getAllProjects = catchAsync(async (req, res, next) => {
  const projects = await Project.findAll({
    where: { status: "active" },
    include: [{ model: Tecnologies }]
  });

  const projectsPromises = projects.map(
    async ({
      id,
      deploy,
      title,
      englishDescription,
      spanisDescription,
      image,
      tecnologies,
      status,
      createdAt,
      updatedAt
    }) => {
      const imgRef = ref(storage, image);

      const imgDownloadUrl = await getDownloadURL(imgRef);

      const tecnologiesPromises = tecnologies.map(
        async ({
          id,
          image: tecnologyImage,
          name,
          projectId,
          status,
          createdAt,
          updatedAt
        }) => {
          const TecnoImgRef = ref(storage, tecnologyImage);

          const tecnologyImageDownloadUrl = await getDownloadURL(TecnoImgRef);

          return {
            id,
            image: tecnologyImageDownloadUrl,
            name,
            projectId,
            status,
            createdAt,
            updatedAt
          };
        }
      );
      const resolvedTecnologies = await Promise.all(tecnologiesPromises);

      console.log(resolvedTecnologies);

      return {
        id,
        deploy,
        title,
        englishDescription,
        spanisDescription,
        image: imgDownloadUrl,
        tecnologies: resolvedTecnologies,
        status,
        createdAt,
        updatedAt
      };
    }
  );

  const resolvedProjects = await Promise.all(projectsPromises);

  res.status(200).json({
    status: "success",
    data: {
      projects: resolvedProjects
    }
  });
});
