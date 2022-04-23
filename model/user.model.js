const { database } = require("../utils/database");

const { DataTypes } = require("sequelize");

const User = database.define("user", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER
  },
  language: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  document: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(10),
    allowNull: false,
    defaultValue: "active"
  }
});

module.exports = { User };
