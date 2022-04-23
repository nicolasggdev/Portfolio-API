const { app } = require("./app");

const dotenv = require("dotenv");

const { database } = require("./utils/database");

const { relationModel } = require("./utils/relationModel");

dotenv.config({ path: "./config.env" });

database
  .authenticate()
  .then(() => console.log("Database is authenticated"))
  .catch((err) => console.log(err));

relationModel();

database
  .sync()
  .then(() => console.log("Database is synced"))
  .catch((err) => console.log(err));

PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Express is running on PORT: ${PORT}`);
});
