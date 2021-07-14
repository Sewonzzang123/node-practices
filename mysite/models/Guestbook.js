const { Sequelize, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  //user라는 객체의 정보를 정의.
  return sequelize.define(
    "Guestbook",
    {
      no: {
        field: "no",
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        field: "name",
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      password: {
        field: "password",
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      message: {
        field: "message",
        type: DataTypes.TEXT,
        allowNull: false,
      },
      regDate: {
        field: "reg_date",
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn("now"),
        allowNull: false,
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      timestamp: true,
      createdAt: false,
      updatedAt: false,
      tableName: "guestbook",
    }
  );
};
