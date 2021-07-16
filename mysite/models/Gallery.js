const { Sequelize, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  //user라는 객체의 정보를 정의.
  return sequelize.define(
    "Gallery",
    {
      no: {
        field: "no",
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
      },
      comment: {
        field: "comment",
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      url: {
        field: "url",
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      timestamp: true,
      createdAt: false,
      updatedAt: false,
      tableName: "gallery",
    }
  );
};
