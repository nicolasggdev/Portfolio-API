const express = require("express");

const { globalErrorHandler } = require("./middleware/error.middleware");

const { userRouter } = require("./routes/user.routes");
const { projectsRouter } = require("./routes/projects.routes");
const { tecnologiesRouter } = require("./routes/tecnologies.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/projects", projectsRouter);
app.use("/api/v1/tecnologies", tecnologiesRouter);

app.use("*", (req, res, next) => {
  next(new AppError(404, `${req.originalUrl} not found in this server.`));
});

app.use(globalErrorHandler);

module.exports = { app };
