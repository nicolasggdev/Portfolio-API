const { database } = require("../utils/database");

const { DataTypes } = require("sequelize");

const Project = database.define("project", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  deploy: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  englishDescription: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  spanisDescription: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(10),
    allowNull: false,
    defaultValue: "active"
  }
});

module.exports = { Project };
