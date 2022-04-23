const { Project } = require("../model/project.model");
const { Tecnologies } = require("../model/tecnologies.model");

exports.relationModel = () => {
  // 1 Project -> M Tecnologies
  Project.hasMany(Tecnologies);
  Tecnologies.belongsTo(Project);
};
