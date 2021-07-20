const { Sequelize, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define(
    "Site",
    {
      title: {
        field: "title",
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      welcome: {
        field: "welcome",
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      profile: {
        field: "profile",
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      description: {
        field: "description",
        type: DataTypes.STRING(500),
        allowNull: false,
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      timestamp: true,
      createdAt: false,
      updatedAt: false,
      tableName: "site",
    }
  );
};
